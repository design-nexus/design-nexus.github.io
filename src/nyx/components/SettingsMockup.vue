<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import {
  AppWindow, BatteryCharging, Bell, Bluetooth, Camera, Cog, FolderSymlink, HardDrive, House, Keyboard,
  Laptop, LayoutGrid, Lightbulb, ListChecks, Lock, Monitor, Network, PanelLeft, Palette, Printer,
  Puzzle, Search, SunMoon, Volume2, Wifi,
} from 'lucide-vue-next'

// Values from a capture of Settings' Home page; edit freely.
const machine = { host: 'Hades', model: 'ASUS ROG Zephyrus G16 GU605CW', updates: 15 }
const facts = [
  ['Omarchy', '4.0.0 · rc'], ['Memory', '30.8 GB'], ['Kernel', '7.2.8-5-omarchy-bore'],
  ['Processor', 'Intel Core Ultra 9 285H'], ['Hyprland', 'v0.56.2'], ['Up for', '6 days 18 h'],
]
const tiles = [
  { title: 'Processor', value: '17%', detail: '16 cores', fill: 0.17 },
  { title: 'Memory', value: '62%', detail: '19.0 GB of 30.8 GB', fill: 0.62 },
  { title: 'Disk', value: '38%', detail: '1.2 TB free', fill: 0.38 },
  { title: 'Battery', value: '100%', detail: 'Full · 96% health', fill: 1 },
  { title: 'Temperature', value: '142°', detail: 'CPU package', fill: 0.61 },
]

// Section colours from nyx-theme's [sections.settings].
const groups = [
  { color: 'blue', items: [['Wi-Fi', Wifi], ['Bluetooth', Bluetooth], ['Network', Network], ['Mounts', FolderSymlink]] },
  { color: 'amber', items: [['Displays', Monitor], ['Sound', Volume2], ['Power & Battery', BatteryCharging], ['Lock Screen', Lock], ['Printers', Printer], ['Disks', HardDrive], ['ASUS', Laptop], ['Aura Lighting', Lightbulb]] },
  { color: 'violet', items: [['Appearance', Palette], ['Window Style', AppWindow], ['Bar & Notifications', Bell], ['Bar Plugins', Puzzle], ['Night Light', SunMoon]] },
  { color: 'pink', items: [['Tiling & Workspaces', LayoutGrid], ['Keyboard Shortcuts', Keyboard], ['Startup & Rules', ListChecks], ['Capture & Tools', Camera]] },
] as const

/** A deterministic, plausible-looking minute of samples, 0 to 1. */
function series(seed: number, base: number, jitter: number, spikes: number) {
  let state = seed
  const random = () => (state = (state * 9301 + 49297) % 233280) / 233280
  return Array.from({ length: 60 }, () => {
    const spike = random() < spikes ? random() * 0.3 : 0
    return Math.min(1, Math.max(0, base + (random() - 0.5) * jitter + spike))
  })
}
function path(values: number[], close = false) {
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${(1 - v) * 40}`)
  return `M${points.join(' L')}${close ? ' L100,40 L0,40 Z' : ''}`
}
const charts = [
  { title: 'Processor', value: '17%', line: series(7, 0.18, 0.1, 0.15) },
  { title: 'Memory', value: '19.0 GB used', line: series(3, 0.62, 0.01, 0), second: series(5, 0.04, 0.005, 0) },
]

const ring = { radius: 30, circumference: 2 * Math.PI * 30 }

const frame = ref<HTMLElement | null>(null)
const { width } = useElementSize(frame)
const wide = computed(() => width.value === 0 || width.value >= 560)
const design = computed(() => wide.value ? { width: 1100, height: 760 } : { width: 720, height: 880 })
const scale = computed(() => (width.value || design.value.width) / design.value.width)
</script>

<template>
  <div
    ref="frame"
    class="relative w-full overflow-hidden"
    :style="{ height: `${design.height * scale}px` }"
    role="img"
    aria-label="Nyx Settings on its Home page: this computer at a glance, quick settings, live gauges and activity charts"
  >
    <div
      class="absolute left-0 top-0 flex origin-top-left flex-col bg-nyx-bg text-[13px] text-nyx-text"
      :style="{ width: `${design.width}px`, height: `${design.height}px`, transform: `scale(${scale})` }"
      aria-hidden="true"
    >
      <!-- Header -->
      <div class="flex h-[46px] shrink-0 items-center gap-3 px-3.5">
        <div class="flex shrink-0 items-center gap-2.5" :class="wide ? 'w-[198px]' : ''">
          <Cog class="h-5 w-5 text-nyx-teal" />
          <span class="text-[13.5px] font-semibold text-nyx-teal">Settings</span>
          <span class="text-[12.5px] text-nyx-dim">Home</span>
          <PanelLeft class="ml-auto h-4 w-4 text-nyx-dim" :class="wide ? '' : 'ml-2'" />
        </div>
        <div class="mx-auto flex h-8 w-full max-w-[300px] items-center gap-2 rounded-[7px] bg-nyx-card px-2.5 text-nyx-dim">
          <Search class="h-4 w-4" /> Search all settings <span class="text-nyx-tertiary">(Ctrl+F)</span>
        </div>
        <span v-if="wide" class="w-[198px] shrink-0" />
      </div>

      <div class="flex min-h-0 flex-1">
        <!-- Sidebar -->
        <div class="shrink-0 overflow-hidden px-2" :class="wide ? 'w-[212px]' : 'w-[56px]'">
          <div class="relative flex h-[34px] items-center gap-2.5 rounded-[7px] bg-nyx-teal/15 px-2.5 shadow-[inset_0_0_0_1px_rgb(var(--nyx-teal)/.35)]" :class="wide ? '' : 'justify-center'">
            <span class="absolute inset-y-2 left-0 w-0.5 rounded-full bg-nyx-teal" />
            <House class="h-[17px] w-[17px] text-nyx-teal" />
            <template v-if="wide">
              <span class="font-medium">Home</span>
              <span class="ml-auto rounded-full bg-nyx-teal/20 px-2 text-[11px] font-semibold text-nyx-teal">{{ machine.updates }}</span>
            </template>
          </div>
          <template v-for="group in groups" :key="group.color">
            <div class="my-2" :class="wide ? 'mx-1 h-px' : 'mx-auto h-0.5 w-4 rounded-full'" :style="{ background: `rgb(var(--nyx-${group.color}) / ${wide ? 0.35 : 0.8})` }" />
            <div v-for="[label, icon] in group.items" :key="label" class="flex h-[30px] items-center gap-2.5 rounded-[7px] px-2.5 text-nyx-text/90" :class="wide ? '' : 'justify-center'">
              <component :is="icon" class="h-[17px] w-[17px] shrink-0 text-nyx-dim" />
              <span v-if="wide" class="truncate">{{ label }}</span>
            </div>
          </template>
        </div>

        <!-- Page -->
        <div class="relative min-w-0 flex-1 overflow-hidden px-4 pt-1.5">
          <div class="mx-auto flex max-w-[730px] flex-col gap-3">
            <div class="flex items-center gap-6 rounded-[11px] bg-nyx-card px-5 py-4">
              <div class="min-w-0 flex-1">
                <p class="text-[19px] font-semibold leading-tight">{{ machine.host }}</p>
                <p class="mt-0.5 text-nyx-dim">{{ machine.model }}</p>
                <div class="mt-3.5 grid grid-cols-3 gap-x-6 gap-y-3">
                  <div v-for="[title, value] in facts" :key="title" class="min-w-0">
                    <p class="text-[11px] font-semibold text-nyx-tertiary">{{ title }}</p>
                    <p class="truncate">{{ value }}</p>
                  </div>
                </div>
              </div>
              <div class="flex w-[148px] shrink-0 flex-col items-center justify-center rounded-[9px] bg-nyx-teal/15 py-4 shadow-[inset_0_0_0_1px_rgb(var(--nyx-teal)/.25)]">
                <span class="text-[26px] font-semibold leading-none text-nyx-teal">{{ machine.updates }}</span>
                <span class="mt-1.5 text-[11.5px] font-medium text-nyx-dim">updates available</span>
              </div>
            </div>

            <p class="mt-1 px-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-nyx-tertiary">Quick settings</p>
            <div class="flex flex-col gap-1 rounded-[11px] bg-nyx-card px-4 py-2">
              <div class="flex min-h-[48px] items-center gap-4">
                <div class="flex-1">
                  <p class="font-medium">Do not disturb</p>
                  <p class="text-[12px] text-nyx-dim">Silence notifications until you turn it back on.</p>
                </div>
                <span class="flex h-5 w-9 items-center rounded-full bg-nyx-raised px-[3px] shadow-[inset_0_0_0_1px_rgb(var(--nyx-border))]"><i class="h-3.5 w-3.5 rounded-full bg-nyx-dim" /></span>
              </div>
              <div class="flex min-h-[48px] items-center gap-4">
                <div class="min-w-0 flex-1">
                  <p class="font-medium">Power profile</p>
                  <p class="text-[12px] text-nyx-dim">Battery life or speed, right now. Power &amp; Battery sets it per power source.</p>
                </div>
                <span class="flex shrink-0 rounded-[7px] bg-nyx-bg p-0.5 text-[12.5px]">
                  <span class="px-2.5 py-1 text-nyx-dim">Saver</span>
                  <span class="rounded-[5px] bg-nyx-raised px-2.5 py-1 shadow-sm">Balanced</span>
                  <span class="px-2.5 py-1 text-nyx-dim">Performance</span>
                </span>
              </div>
            </div>

            <div class="grid gap-3" :class="wide ? 'grid-cols-5' : 'grid-cols-3'">
              <div v-for="tile in tiles" :key="tile.title" class="flex flex-col items-center rounded-[11px] bg-nyx-card px-2 pb-3.5 pt-4">
                <span class="relative grid h-[76px] w-[76px] place-items-center">
                  <svg viewBox="0 0 76 76" class="absolute inset-0 -rotate-90">
                    <circle cx="38" cy="38" :r="ring.radius" fill="none" stroke-width="6" :style="{ stroke: 'rgb(var(--nyx-border))' }" />
                    <circle
                      cx="38" cy="38" :r="ring.radius" fill="none" stroke-width="6" stroke-linecap="round"
                      :stroke-dasharray="`${ring.circumference * tile.fill} ${ring.circumference}`"
                      :style="{ stroke: 'rgb(var(--nyx-blue))' }"
                    />
                  </svg>
                  <span class="text-[14px] font-semibold">{{ tile.value }}</span>
                </span>
                <p class="mt-2.5 font-medium">{{ tile.title }}</p>
                <p class="text-[11.5px] text-nyx-dim">{{ tile.detail }}</p>
              </div>
            </div>

            <div class="mt-1 px-0.5">
              <p class="text-[11px] font-semibold uppercase tracking-[0.06em] text-nyx-tertiary">Activity</p>
              <p class="text-[12px] text-nyx-dim">The last minute, updated every second while this page is open.</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="chart in charts" :key="chart.title" class="rounded-[11px] bg-nyx-card p-4">
                <div class="mb-2.5 flex items-center justify-between">
                  <span class="font-medium">{{ chart.title }}</span>
                  <span class="text-[11.5px] text-nyx-dim">{{ chart.value }}</span>
                </div>
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="h-16 w-full rounded-[7px] bg-nyx-bg/70">
                  <path :d="path(chart.line, true)" :style="{ fill: 'rgb(var(--nyx-blue) / .18)' }" />
                  <path :d="path(chart.line)" fill="none" stroke-width="1.5" vector-effect="non-scaling-stroke" :style="{ stroke: 'rgb(var(--nyx-blue))' }" />
                  <path v-if="chart.second" :d="path(chart.second)" fill="none" stroke-width="1.5" vector-effect="non-scaling-stroke" :style="{ stroke: 'rgb(var(--nyx-tertiary))' }" />
                </svg>
              </div>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-nyx-bg to-transparent" />
        </div>
      </div>

      <!-- Status bar -->
      <div class="flex h-7 shrink-0 items-center justify-between gap-4 px-3.5 text-[11.5px] text-nyx-dim">
        <span><span class="font-semibold text-nyx-text">F1</span>&nbsp; Shortcuts</span>
        <span v-if="wide" class="truncate">This computer at a glance: activity, storage and updates.</span>
      </div>
    </div>
  </div>
</template>
