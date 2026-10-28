<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, Clock, FileText, Folder, HardDrive, Image, Plus, Search, SlidersHorizontal, Star, X } from 'lucide-vue-next'
import { useNyxTheme } from '../themes'

const { theme, themes } = useNyxTheme()
const themeName = computed(() => themes.find(item => item.id === theme.value)?.name ?? 'Nyx Dark')

const places = [
  { label: 'Recent', icon: Clock },
  { label: 'Starred', icon: Star },
  { label: 'Projects', icon: Folder, active: true },
  { label: 'Pictures', icon: Image },
]

const rows = [
  { name: 'nyx-design', kind: 'Folder', size: '18 items', icon: Folder, tone: 'text-nyx-blue' },
  { name: 'nyx-files', kind: 'Folder', size: '42 items', icon: Folder, tone: 'text-nyx-blue' },
  { name: 'STYLE.md', kind: 'Markdown', size: '19 KB', icon: FileText, tone: 'text-nyx-amber', selected: true },
  { name: 'suite.toml', kind: 'TOML', size: '17 KB', icon: FileText, tone: 'text-nyx-teal' },
  { name: 'wallpaper.png', kind: 'Image', size: '4.8 MB', icon: Image, tone: 'text-nyx-coral' },
]
</script>

<template>
  <div class="overflow-hidden rounded-[22px] border border-nyx-border bg-nyx-bg text-[12px] text-nyx-text shadow-[0_40px_80px_-40px_rgb(var(--nyx-shadow)/.8)]" aria-hidden="true">
    <!-- Unified header -->
    <div class="flex h-11 items-center gap-3 px-3.5">
      <span class="flex items-center gap-2 font-semibold text-nyx-blue">
        <Folder class="h-4 w-4" /> Files
      </span>
      <span class="hidden items-center gap-1 text-nyx-dim sm:flex">
        ken <ChevronRight class="h-3 w-3 text-nyx-tertiary" /> Projects <ChevronRight class="h-3 w-3 text-nyx-tertiary" /> <span class="text-nyx-text">nyx</span>
      </span>
      <span class="ml-auto flex h-7 items-center gap-2 rounded-[7px] bg-nyx-card px-2.5 text-nyx-tertiary">
        <Search class="h-3.5 w-3.5" /> <span class="hidden md:inline">Search</span>
        <span class="ml-2 hidden rounded bg-nyx-raised px-1 font-dm text-[10px] lg:inline">Ctrl F</span>
      </span>
      <SlidersHorizontal class="h-4 w-4 text-nyx-dim" />
    </div>

    <div class="flex">
      <!-- Sidebar -->
      <div class="hidden w-40 shrink-0 flex-col gap-0.5 px-2 pb-3 sm:flex">
        <div
          v-for="place in places"
          :key="place.label"
          class="relative flex h-8 items-center gap-2.5 rounded-[7px] px-2.5"
          :class="place.active ? 'bg-nyx-blue/15 text-nyx-text' : 'text-nyx-dim'"
        >
          <span v-if="place.active" class="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-nyx-blue" />
          <component :is="place.icon" class="h-4 w-4" :class="place.active ? 'text-nyx-blue' : ''" />
          {{ place.label }}
        </div>
        <p class="mt-3 px-2.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-nyx-tertiary">Devices</p>
        <div class="flex h-8 items-center gap-2.5 rounded-[7px] px-2.5 text-nyx-dim"><HardDrive class="h-4 w-4" /> Samsung T7</div>
      </div>

      <!-- Content -->
      <div class="relative min-w-0 flex-1 pb-14 pr-2 pl-2 sm:pl-0">
        <div class="mb-2 flex items-center gap-1.5">
          <span class="flex h-7 items-center gap-2 rounded-[7px] bg-nyx-card px-2.5">nyx <X class="h-3 w-3 text-nyx-tertiary" /></span>
          <span class="flex h-7 items-center gap-2 px-2.5 text-nyx-dim">Downloads <X class="h-3 w-3 text-nyx-tertiary" /></span>
          <Plus class="h-3.5 w-3.5 text-nyx-tertiary" />
        </div>
        <div class="grid grid-cols-[1fr_auto] gap-x-4 px-2.5 pb-1.5 text-[11px] text-nyx-tertiary sm:grid-cols-[1fr_auto_auto]">
          <span>Name</span><span class="hidden sm:block">Kind</span><span class="text-right">Size</span>
        </div>
        <div
          v-for="row in rows"
          :key="row.name"
          class="grid h-9 grid-cols-[1fr_auto] items-center gap-x-4 rounded-[7px] px-2.5 sm:grid-cols-[1fr_auto_auto]"
          :class="row.selected ? 'bg-nyx-blue/15' : ''"
        >
          <span class="flex min-w-0 items-center gap-2.5 truncate"><component :is="row.icon" class="h-4 w-4 shrink-0" :class="row.tone" /> {{ row.name }}</span>
          <span class="hidden w-16 text-nyx-dim sm:block">{{ row.kind }}</span>
          <span class="w-14 text-right tabular-nums text-nyx-dim">{{ row.size }}</span>
        </div>

        <!-- Toast -->
        <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-[11px] bg-nyx-raised px-3 py-2 shadow-lg shadow-black/20">
          <span class="h-2 w-2 animate-pulse rounded-full bg-nyx-green" />
          Following <span class="font-semibold">{{ themeName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
