<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

const props = defineProps<{ small?: boolean }>()

const glyphs: Record<string, string[]> = {
  N: ['1001', '1101', '1101', '1011', '1011', '1001', '1001'],
  Y: ['1001', '1001', '1001', '0110', '0110', '0110', '0110'],
  X: ['1001', '1001', '0110', '0110', '0110', '1001', '1001'],
}
const label = 'NYX'
const columns = [...label].reduce((width, character) => width + glyphs[character][0].length + 1, -1)
const isDrawing = ref(false)

const pixels = computed(() => {
  let cursor = 0
  let index = 0
  const items: { key: string; x: number; y: number; delay: number }[] = []
  for (const character of label) {
    const glyph = glyphs[character]
    glyph.forEach((row, y) => [...row].forEach((on, x) => {
      if (on === '1') items.push({ key: `${character}-${x}-${y}`, x: cursor + x, y, delay: 200 + index++ * 28 })
    }))
    cursor += glyph[0].length + 1
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

onMounted(() => { if (!props.small) beginDrawing() })
defineExpose({ redraw })
</script>

<template>
  <div class="nyx-wordmark" :class="{ 'is-small': small }" :style="{ '--columns': columns }" role="img" aria-label="Nyx">
    <i
      v-for="pixel in pixels"
      :key="pixel.key"
      class="nyx-pixel"
      :class="{ 'is-drawing': isDrawing }"
      :style="{ '--x': pixel.x, '--y': pixel.y, '--delay': `${pixel.delay}ms` }"
    />
  </div>
</template>
