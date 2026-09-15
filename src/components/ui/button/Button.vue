<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50', {
  variants: { variant: { outline: 'border border-[#6272a466] bg-[#44475a33] text-[#bd93f9] hover:-translate-y-0.5 hover:border-[#ff79c6] hover:bg-[#ff79c61c] hover:text-[#f8f8f2]' }, size: { icon: 'h-10 w-10', default: 'h-10 px-3' } },
  defaultVariants: { variant: 'outline', size: 'default' },
})
const props = defineProps<{ variant?: VariantProps<typeof buttonVariants>['variant']; size?: VariantProps<typeof buttonVariants>['size']; class?: string }>()
const attrs = useAttrs()
const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size }), props.class))
</script>

<template><button v-bind="attrs" :class="classes"><slot /></button></template>
