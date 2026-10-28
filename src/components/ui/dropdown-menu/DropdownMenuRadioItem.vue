<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { Check } from 'lucide-vue-next'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, type DropdownMenuRadioItemEmits, type DropdownMenuRadioItemProps, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuRadioItemEmits>()
const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="cn('relative flex cursor-pointer select-none items-center gap-3 rounded-xl py-2 pl-2.5 pr-9 text-sm outline-none transition-colors data-[highlighted]:bg-nyx-accent/10 data-[state=checked]:text-nyx-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)"
  >
    <slot />
    <span class="absolute right-2.5 flex h-4 w-4 items-center justify-center text-nyx-accent">
      <DropdownMenuItemIndicator><Check class="h-4 w-4" /></DropdownMenuItemIndicator>
    </span>
  </DropdownMenuRadioItem>
</template>
