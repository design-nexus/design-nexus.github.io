<script setup lang="ts">
import type { ThemeId } from '../themes'

defineProps<{ theme: ThemeId }>()
</script>

<template>
  <span :data-theme="theme" class="relative inline-flex h-5 w-5 shrink-0 overflow-hidden rounded-full border border-nyx-border bg-nyx-bg" aria-hidden="true">
    <span class="absolute inset-y-0 right-0 w-1/2 bg-nyx-accent" />
    <span class="absolute bottom-0 left-0 h-1/2 w-1/2 bg-nyx-pink" />
  </span>
</template>
