<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, Palette } from 'lucide-vue-next'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNyxTheme, type ThemeId } from '../themes'
import ThemeSwatch from './ThemeSwatch.vue'

const { theme, themes, setTheme } = useNyxTheme()
const trigger = ref<HTMLElement | null>(null)
const active = computed(() => themes.find(item => item.id === theme.value) ?? themes[0])

function choose(value: unknown) {
  const rect = trigger.value?.getBoundingClientRect()
  setTheme(value as ThemeId, rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
}
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <button
        ref="trigger"
        type="button"
        class="group inline-flex h-10 items-center gap-2.5 rounded-xl border border-nyx-border/80 bg-nyx-card/60 pl-2.5 pr-3 text-sm text-nyx-text transition hover:border-nyx-accent/60 data-[state=open]:border-nyx-accent/60"
        :aria-label="`Theme: ${active.name}. Change theme`"
      >
        <ThemeSwatch :theme="active.id" />
        <span class="hidden font-medium sm:inline">{{ active.name }}</span>
        <ChevronDown class="h-4 w-4 text-nyx-dim transition group-data-[state=open]:rotate-180" aria-hidden="true" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel class="flex items-center gap-2"><Palette class="h-3.5 w-3.5" aria-hidden="true" /> Theme</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup :model-value="theme" @update:model-value="choose">
        <DropdownMenuRadioItem v-for="item in themes" :key="item.id" :value="item.id">
          <ThemeSwatch :theme="item.id" />
          <span class="flex flex-col">
            <span class="font-medium">{{ item.name }}</span>
            <span class="text-xs text-nyx-tertiary">{{ item.light ? 'Light' : 'Dark' }}</span>
          </span>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
