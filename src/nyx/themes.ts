import { nextTick, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export type ThemeId = 'nyx-dark' | 'nyx-light' | 'catppuccin-mocha' | 'tokyo-night' | 'dracula'

export interface NyxTheme {
  id: ThemeId
  name: string
  light: boolean
  /** Window background, also used for `<meta name="theme-color">`. Keep in sync with nyx.css. */
  bg: string
  note: string
}

export const themes: NyxTheme[] = [
  { id: 'nyx-dark', name: 'Nyx Dark', light: false, bg: '#09090a', note: 'Neutral near-black. The suite default.' },
  { id: 'nyx-light', name: 'Nyx Light', light: true, bg: '#f7f7f8', note: 'The light counterpart, with deeper accents.' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', light: false, bg: '#1e1e2e', note: 'Soothing pastels on a warm base.' },
  { id: 'tokyo-night', name: 'Tokyo Night', light: false, bg: '#1a1b26', note: 'Downtown lights on a deep indigo night.' },
  { id: 'dracula', name: 'Dracula', light: false, bg: '#282a36', note: 'The classic dark theme for night owls.' },
]

const isThemeId = (value: unknown): value is ThemeId => themes.some(theme => theme.id === value)
const initial = document.documentElement.dataset.theme
const current = useLocalStorage<ThemeId>('nyx-theme', isThemeId(initial) ? initial : 'nyx-dark', { writeDefaults: false })

function apply(id: ThemeId) {
  const theme = themes.find(item => item.id === id) ?? themes[0]
  const root = document.documentElement
  root.dataset.theme = theme.id
  root.style.colorScheme = theme.light ? 'light' : 'dark'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bg)
}

watch(current, id => apply(isThemeId(id) ? id : 'nyx-dark'), { immediate: true })

type TransitionDocument = Document & { startViewTransition?: (update: () => Promise<void> | void) => { ready: Promise<void> } }

export function useNyxTheme() {
  function setTheme(id: ThemeId, origin?: { x: number; y: number }) {
    if (id === current.value) return
    const doc = document as TransitionDocument
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || reduce) {
      current.value = id
      return
    }
    const x = origin?.x ?? innerWidth / 2
    const y = origin?.y ?? 0
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = doc.startViewTransition(async () => {
      current.value = id
      apply(id)
      await nextTick()
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    }).catch(() => {})
  }

  return { theme: current, themes, setTheme }
}
