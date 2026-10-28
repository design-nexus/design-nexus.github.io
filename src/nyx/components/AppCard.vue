<script setup lang="ts">
import { ArrowUpRight, Cloud, Mic } from 'lucide-vue-next'
import type { NyxApp } from '../apps'

defineProps<{ app: NyxApp; wide?: boolean }>()

const glyphs: Record<string, typeof Cloud> = { cloud: Cloud, assistant: Mic }
</script>

<template>
  <a
    :href="app.repo"
    target="_blank"
    rel="noopener"
    class="app-card nyx-card group relative flex h-full flex-col gap-4 overflow-hidden p-5 transition duration-300 hover:-translate-y-1"
    :style="{ '--card-accent': `var(--nyx-${app.accent})` }"
  >
    <span class="app-card-glow pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

    <ArrowUpRight class="absolute right-4 top-4 h-4 w-4 text-nyx-tertiary opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden="true" />

    <div class="flex items-center gap-3.5">
      <span v-if="app.icon && !app.tile" class="h-12 w-12 shrink-0 transition duration-300 group-hover:scale-105">
        <img :src="app.icon" alt="" width="48" height="48" loading="lazy" class="h-12 w-12" />
      </span>
      <span v-else class="app-tile grid h-12 w-12 shrink-0 place-items-center rounded-[12px] transition duration-300 group-hover:scale-105">
        <img v-if="app.icon" :src="app.icon" alt="" width="30" height="30" loading="lazy" class="h-7 w-7" />
        <component :is="glyphs[app.id]" v-else class="h-6 w-6 text-[rgb(var(--card-accent))]" aria-hidden="true" />
      </span>
      <div class="flex min-w-0 flex-wrap items-center gap-2 pr-5">
        <h3 class="text-base font-semibold text-nyx-text">{{ app.name }}</h3>
        <span v-if="app.optional" class="rounded-md bg-nyx-warning/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-nyx-warning">Optional</span>
        <span v-if="app.id === 'cloud'" class="rounded-md bg-nyx-teal/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-nyx-teal">Service</span>
      </div>
    </div>

    <p class="-mt-1 text-sm leading-relaxed text-nyx-dim" :class="wide ? 'sm:text-[15px]' : ''">{{ app.tagline }}</p>

    <ul class="mt-auto flex flex-wrap gap-1.5" :class="wide ? '' : 'flex-col'">
      <li
        v-for="highlight in app.highlights"
        :key="highlight"
        class="flex items-center gap-2 text-[13px] text-nyx-dim"
        :class="wide ? 'rounded-lg border border-nyx-border/70 bg-nyx-bg/40 px-2.5 py-1' : ''"
      >
        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--card-accent))]" />
        {{ highlight }}
      </li>
    </ul>

    <p v-if="app.note" class="border-t border-nyx-border/70 pt-3 text-xs leading-relaxed text-nyx-tertiary">{{ app.note }}</p>
  </a>
</template>

<style scoped>
.app-card:hover { border-color: rgb(var(--card-accent) / .45); }
.app-card::before { content: ''; position: absolute; inset: 0 0 auto; height: 1px; background: linear-gradient(90deg, transparent, rgb(var(--card-accent) / .7), transparent); opacity: 0; transition: opacity 300ms; }
.app-card:hover::before { opacity: 1; }
.app-card-glow { background: rgb(var(--card-accent) / .22); }
.app-tile { background: linear-gradient(135deg, #2a2f45, #16182a); box-shadow: inset 0 0 0 1px rgb(var(--card-accent) / .4); }
</style>
