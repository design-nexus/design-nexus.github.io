<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Command, Github, Mail } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'

type Pixel = { key: string; x: number; y: number; delay: number }

const glyphs: Record<string, string[]> = {
  D: ['1110','1001','1001','1001','1001','1001','1110'],
  E: ['1111','1000','1000','1110','1000','1000','1111'],
  S: ['1111','1000','1000','1111','0001','0001','1111'],
  I: ['111','010','010','010','010','010','111'],
  G: ['1111','1000','1000','1011','1001','1001','1111'],
  N: ['1001','1101','1101','1011','1011','1001','1001'],
  '-': ['000','000','000','111','000','000','000'],
  X: ['1001','1001','0110','0110','0110','1001','1001'],
  U: ['1001','1001','1001','1001','1001','1001','1111'],
  '.': ['0','0','0','0','0','0','1'],
}

const label = 'DESIGN-NEX.US'
const isDrawing = ref(false)

const pixels = computed<Pixel[]>(() => {
  let cursor = 0
  let index = 0
  const items: Pixel[] = []
  for (const character of label) {
    const glyph = glyphs[character]
    const width = glyph[0].length
    glyph.forEach((row, y) => [...row].forEach((on, x) => {
      if (on === '1') items.push({ key: `${character}-${x}-${y}-${index++}`, x: cursor + x, y, delay: index * 20 })
    }))
    cursor += width + 1
  }
  return items
})

function beginDrawing() {
  // A second frame guarantees the hidden pixel state is painted before animation begins.
  requestAnimationFrame(() => requestAnimationFrame(() => { isDrawing.value = true }))
}

async function redraw() {
  isDrawing.value = false
  await nextTick()
  beginDrawing()
}

onMounted(beginDrawing)
</script>

<template>
  <main class="relative isolate flex min-h-screen overflow-hidden bg-[#181922] text-[#f8f8f2]">
    <div class="grid-surface absolute inset-0 -z-10 opacity-50" />
    <div class="glow glow-left absolute -left-40 top-1/3 -z-10 h-80 w-80 rounded-full" />
    <div class="glow glow-right absolute -right-32 bottom-[-5rem] -z-10 h-96 w-96 rounded-full" />

    <header class="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
      <div class="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-[#bd93f9]">
        <Command class="h-4 w-4" aria-hidden="true" />
        <span>DNX / 01</span>
      </div>
      <p class="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#6272a4] sm:block">Est. 2026</p>
    </header>

    <section class="m-auto flex w-full max-w-7xl flex-col items-center px-5 text-center">
      <p class="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[#8be9fd]">Creative junction</p>

      <div class="wordmark-shell" aria-label="Design Nex.us">
        <i v-for="pixel in pixels" :key="pixel.key" class="pixel" :class="{ 'is-drawing': isDrawing }" :style="{ '--x': pixel.x, '--y': pixel.y, '--delay': `${pixel.delay}ms` }" />
      </div>

      <div class="mt-8 flex items-center gap-3 font-mono text-xs text-[#6272a4]">
        <span class="h-px w-8 bg-[#6272a4]/40" />
        <span>interfaces · identity · pixels</span>
        <span class="h-px w-8 bg-[#6272a4]/40" />
      </div>

      <div class="mt-10 flex items-center gap-3">
        <a href="mailto:hello@design-nex.us" class="icon-link" aria-label="Email Design Nexus"><Mail class="h-4 w-4" /></a>
        <Button class="font-mono text-[0.7rem] uppercase tracking-[0.12em]" type="button" @click="redraw">redraw</Button>
        <a href="https://github.com/design-nexus" class="icon-link" aria-label="GitHub profile"><Github class="h-4 w-4" /></a>
      </div>
    </section>

    <footer class="absolute inset-x-0 bottom-0 flex justify-between p-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6272a4] sm:p-8">
      <span>© 2026 design-nex.us</span><span class="text-[#50fa7b]">● online</span>
    </footer>
  </main>
</template>
