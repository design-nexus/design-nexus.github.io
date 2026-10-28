<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEventListener, useWindowScroll } from '@vueuse/core'
import {
  ArrowLeft, ArrowRight, Columns2, Cpu, Download, Github, Keyboard, Layers,
  Menu, Palette, Search, ShieldCheck, Terminal,
} from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { apps, categories, type CategoryId } from './apps'
import { useNyxTheme, type ThemeId } from './themes'
import { vReveal } from './reveal'
import AppCard from './components/AppCard.vue'
import InstallTerminal from './components/InstallTerminal.vue'
import PixelWordmark from './components/PixelWordmark.vue'
import SettingsMockup from './components/SettingsMockup.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import WindowMockup from './components/WindowMockup.vue'

const { theme, themes, setTheme } = useNyxTheme()
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 12)

const nav = [
  { href: '#apps', label: 'Apps' },
  { href: '#design', label: 'Design' },
  { href: '#themes', label: 'Themes' },
  { href: '#install', label: 'Install' },
]

const stats = [
  { value: String(apps.length), label: 'apps & services' },
  { value: 'GTK 4', label: '+ Rust, native' },
  { value: '5+', label: 'shared themes' },
  { value: 'MIT', label: 'open source' },
]

const wordmark = ref<InstanceType<typeof PixelWordmark> | null>(null)

const category = ref<CategoryId | 'all'>('all')
const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const showFeatured = computed(() => category.value === 'all' && !query.value.trim())
const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return apps.filter(app => {
    if (category.value !== 'all' && app.category !== category.value) return false
    if (!needle) return true
    return [app.name, app.tagline, ...app.highlights].join(' ').toLowerCase().includes(needle)
  })
})
const countFor = (id: CategoryId | 'all') => id === 'all' ? apps.length : apps.filter(app => app.category === id).length

useEventListener(window, 'keydown', (event: KeyboardEvent) => {
  const typing = event.target instanceof HTMLElement && event.target.closest('input, textarea, [contenteditable]')
  if ((event.key === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !typing)) {
    event.preventDefault()
    searchInput.value?.scrollIntoView({ block: 'center' })
    searchInput.value?.focus({ preventScroll: true })
  }
})

function pickTheme(id: ThemeId, event: MouseEvent) {
  setTheme(id, { x: event.clientX, y: event.clientY })
}

const shortcuts = [
  { keys: ['Ctrl', 'K'], label: 'Command palette' },
  { keys: ['Ctrl', 'F'], label: 'Search' },
  { keys: ['Ctrl', ','], label: 'Settings' },
  { keys: ['Ctrl', 'B'], label: 'Sidebar' },
]

const privacy = [
  'Glimpse searches your files on this computer',
  'Mail and Calendar work offline',
  'Assistant listens and answers locally',
  'Secrets live in the desktop keyring',
]

const swatches = ['blue', 'violet', 'pink', 'red', 'coral', 'amber', 'green', 'teal']
const stack = ['Rust', 'GTK 4', 'nyx-core', 'nyx-ui', 'nyx-theme', 'nyx-icons']

const themeToml = `# ~/.config/nyx/themes/midnight.toml
name = "Midnight"
inherits = "nyx-dark"
accent = "#9d7bff"

[accents]
files = "teal"`
</script>

<template>
  <div class="relative isolate min-h-screen overflow-x-clip bg-nyx-bg text-nyx-text">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 border-b transition duration-300"
      :class="scrolled ? 'border-nyx-border/70 bg-nyx-bg/75 backdrop-blur-xl' : 'border-transparent'"
    >
      <div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" class="flex items-center gap-3" aria-label="Nyx, back to top">
          <PixelWordmark small />
          <span class="font-dm text-xs tracking-[0.18em] text-nyx-violet">DNX / NYX</span>
        </a>
        <nav class="ml-6 hidden items-center gap-1 md:flex" aria-label="Sections">
          <a v-for="item in nav" :key="item.href" :href="item.href" class="rounded-lg px-3 py-2 text-sm text-nyx-dim transition hover:bg-nyx-card hover:text-nyx-text">{{ item.label }}</a>
        </nav>
        <div class="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <a href="https://github.com/design-nexus/nyx" target="_blank" rel="noopener" class="nyx-icon-btn hidden sm:grid" aria-label="Nyx on GitHub">
            <Github class="h-4 w-4" />
          </a>
          <DropdownMenu :modal="false">
            <DropdownMenuTrigger as-child>
              <button type="button" class="nyx-icon-btn md:hidden" aria-label="Open menu"><Menu class="h-4 w-4" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="md:hidden">
              <DropdownMenuItem v-for="item in nav" :key="item.href" as-child>
                <a :href="item.href">{{ item.label }}</a>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <a href="https://github.com/design-nexus/nyx" target="_blank" rel="noopener"><Github class="h-4 w-4" /> GitHub</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>

    <main id="top" class="-mt-16">
      <!-- Hero -->
      <section class="relative overflow-hidden pt-32 sm:pt-40">
        <div class="nyx-grid absolute inset-0 -z-10" />
        <div class="nyx-glow absolute -left-40 top-24 -z-10 h-96 w-96 rounded-full bg-nyx-pink" />
        <div class="nyx-glow absolute -right-32 top-72 -z-10 h-[28rem] w-[28rem] rounded-full bg-nyx-blue" />

        <div class="mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-8">
          <p class="nyx-eyebrow mb-6">Desktop suite for Omarchy</p>
          <button type="button" class="rounded-lg" aria-label="Redraw the Nyx wordmark" @click="wordmark?.redraw()">
            <PixelWordmark ref="wordmark" />
          </button>
          <h1 class="mt-10 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            One look. <span class="nyx-gradient-text whitespace-nowrap">Every app</span> you need.
          </h1>
          <p class="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-nyx-dim sm:text-lg">
            Native GTK 4 + Rust apps for Omarchy that share one flat, keyboard-first design,
            fit a half-screen tile, and follow your theme the moment you change it.
          </p>
          <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#install" class="nyx-btn-primary"><Download class="h-4 w-4" /> Install Nyx</a>
            <a href="#apps" class="nyx-btn-ghost">Browse the apps <ArrowRight class="h-4 w-4" /></a>
          </div>

          <dl class="mt-12 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-nyx-border/70 bg-nyx-border/70 sm:grid-cols-4">
            <div v-for="stat in stats" :key="stat.label" class="bg-nyx-bg/80 px-4 py-4 backdrop-blur">
              <dt class="sr-only">{{ stat.label }}</dt>
              <dd class="text-xl font-semibold">{{ stat.value }}</dd>
              <dd class="mt-0.5 font-dm text-[11px] uppercase tracking-[0.14em] text-nyx-tertiary">{{ stat.label }}</dd>
            </div>
          </dl>
        </div>

        <div class="relative mx-auto mt-16 max-w-5xl px-5 pb-24 sm:mt-20 sm:px-8">
          <div class="nyx-glow absolute inset-x-20 top-10 -z-10 h-64 rounded-full bg-nyx-violet" />
          <div class="nyx-float">
            <WindowMockup />
          </div>
          <p class="mt-5 text-center font-dm text-[11px] uppercase tracking-[0.2em] text-nyx-tertiary">
            Switch the theme above and watch it follow
          </p>
        </div>
      </section>

      <!-- Apps -->
      <section id="apps" class="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div v-reveal class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <p class="nyx-eyebrow">The suite</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{{ apps.length }} apps. One family.</h2>
            <p class="mt-4 text-nyx-dim">
              From mail and documents to containers and Git, each app is its own repository and release,
              built on the shared Nyx Core and Nyx Design crates. Install one, or all of them.
            </p>
          </div>
          <label class="relative block w-full lg:w-80">
            <span class="sr-only">Search apps</span>
            <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-nyx-tertiary" aria-hidden="true" />
            <input
              ref="searchInput"
              v-model="query"
              type="search"
              placeholder="Search apps"
              class="h-11 w-full rounded-xl border border-nyx-border bg-nyx-card/70 pl-10 pr-16 text-sm text-nyx-text placeholder:text-nyx-tertiary focus:border-nyx-accent/70 focus:outline-none"
            />
            <span class="nyx-kbd pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 sm:inline-flex">Ctrl K</span>
          </label>
        </div>

        <div v-reveal class="-mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div class="inline-flex gap-1 rounded-2xl border border-nyx-border/70 bg-nyx-card/50 p-1" role="tablist" aria-label="Categories">
            <button
              v-for="item in categories"
              :key="item.id"
              type="button"
              role="tab"
              :aria-selected="category === item.id"
              class="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm transition"
              :class="category === item.id ? 'bg-nyx-raised text-nyx-text shadow-sm' : 'text-nyx-dim hover:text-nyx-text'"
              @click="category = item.id"
            >
              {{ item.label }}
              <span class="font-dm text-[11px] text-nyx-tertiary">{{ countFor(item.id) }}</span>
            </button>
          </div>
        </div>

        <div class="mt-8 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="(app, index) in filtered"
            :key="`${category}-${app.id}`"
            v-reveal="(index % 4) * 60"
            :class="showFeatured && app.featured ? 'sm:col-span-2' : ''"
          >
            <AppCard :app="app" :wide="showFeatured && app.featured" />
          </div>
        </div>
        <div v-if="!filtered.length" class="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-nyx-border py-16 text-center">
          <Search class="h-6 w-6 text-nyx-tertiary" aria-hidden="true" />
          <p class="text-nyx-dim">No apps match “{{ query }}”.</p>
          <button type="button" class="text-sm text-nyx-accent hover:underline" @click="query = ''; category = 'all'">Show every app</button>
        </div>
      </section>

      <!-- Design -->
      <section id="design" class="relative border-y border-nyx-border/60 bg-nyx-panel/60 py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div v-reveal class="max-w-2xl">
            <p class="nyx-eyebrow">Why Nyx</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Compact, structured, breathable.</h2>
            <p class="mt-4 text-nyx-dim">
              Every app is built from the same widgets and the same rules: one blended surface,
              neutral colors with accent only for state, plain type, and icon buttons that name their keys.
            </p>
          </div>

          <div class="mt-12 grid gap-4 md:grid-cols-6">
            <article v-reveal class="nyx-card flex flex-col gap-6 p-6 md:col-span-4">
              <div class="flex items-center gap-3"><Palette class="h-5 w-5 text-nyx-violet" /><h3 class="font-semibold">Follows your theme, live</h3></div>
              <p class="max-w-xl text-sm leading-relaxed text-nyx-dim">
                Choose a theme in any app and the others follow within a second. Or leave <em>Follow Omarchy</em> on,
                and every window restyles itself when your desktop theme changes.
              </p>
              <div class="mt-auto flex flex-wrap gap-2">
                <button
                  v-for="item in themes"
                  :key="item.id"
                  type="button"
                  :data-theme="item.id"
                  class="flex items-center gap-2 rounded-xl border bg-nyx-bg px-3 py-2 text-xs text-nyx-text transition hover:-translate-y-0.5"
                  :class="theme === item.id ? 'border-nyx-accent ring-2 ring-nyx-accent/30' : 'border-nyx-border'"
                  :aria-pressed="theme === item.id"
                  @click="pickTheme(item.id, $event)"
                >
                  <span class="flex -space-x-1" aria-hidden="true">
                    <i class="h-3 w-3 rounded-full bg-nyx-pink ring-2 ring-nyx-bg" /><i class="h-3 w-3 rounded-full bg-nyx-violet ring-2 ring-nyx-bg" /><i class="h-3 w-3 rounded-full bg-nyx-blue ring-2 ring-nyx-bg" />
                  </span>
                  {{ item.name }}
                </button>
              </div>
            </article>

            <article v-reveal="80" class="nyx-card flex flex-col gap-5 p-6 md:col-span-2">
              <div class="flex items-center gap-3"><Keyboard class="h-5 w-5 text-nyx-teal" /><h3 class="font-semibold">Keyboard-first</h3></div>
              <ul class="flex flex-col gap-3">
                <li v-for="shortcut in shortcuts" :key="shortcut.label" class="flex items-center justify-between gap-3 text-sm text-nyx-dim">
                  {{ shortcut.label }}
                  <span class="flex gap-1"><kbd v-for="key in shortcut.keys" :key="key" class="nyx-kbd">{{ key }}</kbd></span>
                </li>
              </ul>
            </article>

            <article v-reveal class="nyx-card flex flex-col gap-5 p-6 md:col-span-2">
              <div class="flex items-center gap-3"><Columns2 class="h-5 w-5 text-nyx-blue" /><h3 class="font-semibold">Made for tiling</h3></div>
              <p class="text-sm leading-relaxed text-nyx-dim">Every layout works in an 800 px half-screen tile, with nothing cut off and nothing scrolling sideways.</p>
              <div class="mt-auto grid grid-cols-2 gap-2" aria-hidden="true">
                <div v-for="side in 2" :key="side" class="flex h-20 gap-1.5 rounded-xl border border-nyx-border bg-nyx-bg p-1.5">
                  <span class="w-3 rounded-md bg-nyx-card" />
                  <span class="flex flex-1 flex-col gap-1.5">
                    <span class="h-2 w-2/3 rounded bg-nyx-card" /><span class="h-2 rounded" :class="side === 1 ? 'bg-nyx-blue/40' : 'bg-nyx-pink/40'" /><span class="h-2 w-1/2 rounded bg-nyx-card" />
                  </span>
                </div>
              </div>
            </article>

            <article v-reveal="80" class="nyx-card flex flex-col gap-5 p-6 md:col-span-2">
              <div class="flex items-center gap-3"><ShieldCheck class="h-5 w-5 text-nyx-green" /><h3 class="font-semibold">Local-first and private</h3></div>
              <ul class="flex flex-col gap-2.5">
                <li v-for="item in privacy" :key="item" class="flex items-start gap-2.5 text-sm text-nyx-dim">
                  <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nyx-green" />{{ item }}
                </li>
              </ul>
            </article>

            <article v-reveal="160" class="nyx-card flex flex-col gap-5 p-6 md:col-span-2">
              <div class="flex items-center gap-3"><Cpu class="h-5 w-5 text-nyx-coral" /><h3 class="font-semibold">Native, not a web view</h3></div>
              <p class="text-sm leading-relaxed text-nyx-dim">GTK 4 and Rust throughout, sharing one foundation for accounts, sync, widgets, icons and playback.</p>
              <div class="mt-auto flex flex-wrap gap-1.5">
                <span v-for="chip in stack" :key="chip" class="rounded-lg border border-nyx-border bg-nyx-bg/60 px-2.5 py-1 font-dm text-[11px] text-nyx-dim">{{ chip }}</span>
              </div>
            </article>

            <figure v-reveal class="nyx-card overflow-hidden md:col-span-4">
              <SettingsMockup />
              <figcaption class="flex items-center gap-3 px-6 py-4 text-sm text-nyx-dim">
                <Layers class="h-4 w-4 text-nyx-violet" aria-hidden="true" />
                Settings: one searchable window for everything you'd otherwise change by editing Lua files.
              </figcaption>
            </figure>

            <article v-reveal="80" class="nyx-card flex flex-col gap-5 p-6 md:col-span-2">
              <div class="flex items-center gap-3"><Terminal class="h-5 w-5 text-nyx-pink" /><h3 class="font-semibold">One installer</h3></div>
              <p class="text-sm leading-relaxed text-nyx-dim">
                Name the apps you want and only those are downloaded, verified against the suite manifest, and installed to
                <code class="font-dm text-nyx-text">~/.local</code>. Then the <code class="font-dm text-nyx-text">nyx</code> command keeps them updated.
              </p>
              <a href="#install" class="mt-auto inline-flex items-center gap-2 text-sm font-medium text-nyx-accent hover:underline">See how <ArrowRight class="h-4 w-4" /></a>
            </article>
          </div>
        </div>
      </section>

      <!-- Themes -->
      <section id="themes" class="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div class="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div v-reveal class="min-w-0">
            <p class="nyx-eyebrow">Themes</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Your colors, everywhere.</h2>
            <p class="mt-4 text-nyx-dim">
              Nyx Dark and Nyx Light ship as defaults, alongside Catppuccin, Tokyo Night, Dracula, Gruvbox, Nord,
              Rosé Pine and more. A theme is one small TOML file: set a few colors and the rest is derived.
            </p>
            <pre class="mt-6 overflow-x-auto rounded-2xl border border-nyx-border bg-nyx-panel p-4 font-dm text-[12px] leading-6 text-nyx-dim"><code>{{ themeToml }}</code></pre>
          </div>

          <div class="grid min-w-0 gap-3 sm:grid-cols-2">
            <div v-for="(item, index) in themes" :key="item.id" v-reveal="index * 60" :class="index === 0 ? 'sm:col-span-2' : ''">
              <button
                type="button"
                :data-theme="item.id"
                class="group w-full overflow-hidden rounded-[18px] border bg-nyx-bg text-left text-nyx-text transition hover:-translate-y-1"
                :class="theme === item.id ? 'border-nyx-accent ring-2 ring-nyx-accent/30' : 'border-nyx-border'"
                :aria-pressed="theme === item.id"
                @click="pickTheme(item.id, $event)"
              >
                <span class="flex h-24 gap-2 p-3" aria-hidden="true">
                  <span class="flex w-1/4 flex-col gap-1.5 rounded-lg bg-nyx-panel p-2">
                    <i class="h-2 rounded bg-nyx-accent/30" /><i class="h-2 w-3/4 rounded bg-nyx-card" /><i class="h-2 w-2/3 rounded bg-nyx-card" />
                  </span>
                  <span class="flex flex-1 flex-col gap-1.5 rounded-lg bg-nyx-card p-2">
                    <i class="h-2 w-1/2 rounded bg-nyx-text/70" /><i class="h-2 w-5/6 rounded bg-nyx-dim/40" />
                    <span class="mt-auto flex gap-1">
                      <i v-for="swatch in swatches" :key="swatch" class="h-3 flex-1 rounded-sm" :style="{ background: `rgb(var(--nyx-${swatch}))` }" />
                    </span>
                  </span>
                </span>
                <span class="flex items-center justify-between gap-3 border-t border-nyx-border px-4 py-3">
                  <span>
                    <span class="block text-sm font-semibold">{{ item.name }}</span>
                    <span class="block text-xs text-nyx-dim">{{ item.note }}</span>
                  </span>
                  <span class="shrink-0 font-dm text-[10px] uppercase tracking-[0.16em]" :class="theme === item.id ? 'text-nyx-accent' : 'text-nyx-tertiary'">
                    {{ theme === item.id ? 'Active' : 'Try it' }}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Install -->
      <section id="install" class="relative overflow-hidden border-t border-nyx-border/60 py-24">
        <div class="nyx-glow absolute left-1/2 top-1/3 -z-10 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-nyx-violet" />
        <div class="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div v-reveal>
            <p class="nyx-eyebrow">Install</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">One line. The apps you want.</h2>
            <p class="mt-4 text-nyx-dim">
              The installer adds what the apps need from the Arch repositories, installs to <code class="font-dm text-nyx-text">~/.local</code>,
              and adds the <code class="font-dm text-nyx-text">nyx</code> command.
            </p>
            <ul class="mt-6 flex flex-col gap-3 text-sm text-nyx-dim">
              <li class="flex gap-3"><span class="nyx-kbd shrink-0">--default</span> Make the apps open their file types.</li>
              <li class="flex gap-3"><span class="nyx-kbd shrink-0">NYX_BUILD=1</span> Build from source instead of using releases.</li>
              <li class="flex gap-3"><span class="nyx-kbd shrink-0">--purge</span> Uninstall and remove settings and data.</li>
            </ul>
          </div>
          <div v-reveal="100" class="min-w-0"><InstallTerminal /></div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-nyx-border/60">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 font-dm text-[10px] uppercase tracking-[0.16em] text-nyx-tertiary sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© 2026 design-nex.us · Nyx is MIT licensed</span>
        <span class="flex items-center gap-6">
          <a href="/" class="inline-flex items-center gap-2 transition hover:text-nyx-text"><ArrowLeft class="h-3 w-3" /> design-nex.us</a>
          <a href="https://github.com/design-nexus/nyx" target="_blank" rel="noopener" class="transition hover:text-nyx-text">GitHub</a>
          <span class="text-nyx-green">● online</span>
        </span>
      </div>
    </footer>
  </div>
</template>
