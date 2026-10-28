<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'] }>()
const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DropdownMenuLabel v-bind="forwarded" :class="cn('px-2.5 pb-1.5 pt-2 font-dm text-[10px] uppercase tracking-[0.2em] text-nyx-tertiary', props.class)">
    <slot />
  </DropdownMenuLabel>
</template>
