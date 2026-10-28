<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSeparatorProps & { class?: HTMLAttributes['class'] }>()
const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <DropdownMenuSeparator v-bind="delegated" :class="cn('-mx-1.5 my-1.5 h-px bg-nyx-border', props.class)" />
</template>
