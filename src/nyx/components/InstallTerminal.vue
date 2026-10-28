<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Check, Copy } from 'lucide-vue-next'
import { apps } from '../apps'

const installer = 'curl -fsSL https://raw.githubusercontent.com/design-nexus/nyx/main/install.sh | bash -s --'
const tabs = [
  { id: 'pick', label: 'Pick apps' },
  { id: 'all', label: 'Everything' },
  { id: 'cli', label: 'nyx CLI' },
] as const
type TabId = typeof tabs[number]['id']

const active = ref<TabId>('pick')
const picked = ref<string[]>(['files', 'mail', 'notes', 'music'])
const choices = apps.filter(app => app.id !== 'cloud')

function toggle(id: string) {
  picked.value = picked.value.includes(id) ? picked.value.filter(item => item !== id) : [...picked.value, id]
}

const lines = computed(() => {
  if (active.value === 'all') return [{ prompt: true, text: `${installer} all` }, { prompt: false, text: '# Assistant is opt-in: add it by name' }]
  if (active.value === 'cli') {
    return [
      { prompt: true, text: 'nyx list' }, { prompt: false, text: '# the apps, and which are installed' },
      { prompt: true, text: 'nyx install chat' },
      { prompt: true, text: 'nyx update' },
      { prompt: true, text: 'nyx uninstall chat --purge' },
    ]
  }
  return [{ prompt: true, text: `${installer} ${picked.value.length ? picked.value.join(' ') : '<apps>'}` }]
})

const command = computed(() => lines.value.filter(line => line.prompt).map(line => line.text).join('\n'))
const { copy, copied, isSupported } = useClipboard({ copiedDuring: 1800 })
</script>

<template>
  <div class="overflow-hidden rounded-[22px] border border-nyx-border bg-nyx-panel shadow-[0_40px_80px_-40px_rgb(var(--nyx-shadow)/.8)]">
    <div class="flex flex-wrap items-center gap-3 border-b border-nyx-border/70 px-4 py-3">
      <span class="flex gap-1.5" aria-hidden="true">
        <i class="h-3 w-3 rounded-full bg-nyx-red/80" /><i class="h-3 w-3 rounded-full bg-nyx-amber/80" /><i class="h-3 w-3 rounded-full bg-nyx-green/80" />
      </span>
      <div class="flex rounded-[10px] bg-nyx-card p-0.5" role="tablist" aria-label="Install options">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="active === tab.id"
          class="rounded-[8px] px-3 py-1.5 text-xs font-medium transition"
          :class="active === tab.id ? 'bg-nyx-raised text-nyx-text shadow-sm' : 'text-nyx-dim hover:text-nyx-text'"
          @click="active = tab.id"
        >{{ tab.label }}</button>
      </div>
      <button
        v-if="isSupported"
        type="button"
        class="ml-auto inline-flex h-8 items-center gap-2 rounded-lg border border-nyx-border px-3 text-xs text-nyx-dim transition hover:border-nyx-accent/60 hover:text-nyx-text"
        @click="copy(command)"
      >
        <component :is="copied ? Check : Copy" class="h-3.5 w-3.5" :class="copied ? 'text-nyx-green' : ''" aria-hidden="true" />
        <span aria-live="polite">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>

    <pre class="whitespace-pre-wrap px-5 py-5 font-dm text-[13px] leading-7 [overflow-wrap:anywhere]"><code><template v-for="(line, index) in lines" :key="index"><span v-if="line.prompt" class="select-none text-nyx-pink">$ </span><span :class="line.prompt ? 'text-nyx-text' : 'text-nyx-tertiary'">{{ line.text }}</span>{{ '\n' }}</template></code></pre>

    <div v-if="active === 'pick'" class="border-t border-nyx-border/70 px-4 py-4">
      <p class="mb-3 font-dm text-[10px] uppercase tracking-[0.2em] text-nyx-tertiary">Choose apps · {{ picked.length }} selected</p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="app in choices"
          :key="app.id"
          type="button"
          :aria-pressed="picked.includes(app.id)"
          class="rounded-lg border px-2.5 py-1 text-xs transition"
          :class="picked.includes(app.id) ? 'border-nyx-accent/60 bg-nyx-accent/15 text-nyx-text' : 'border-nyx-border bg-nyx-card/60 text-nyx-dim hover:text-nyx-text'"
          @click="toggle(app.id)"
        >{{ app.id }}</button>
      </div>
    </div>
  </div>
</template>
