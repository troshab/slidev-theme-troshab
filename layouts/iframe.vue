<script setup lang="ts">
/**
 * Iframe layout - вбудований контент
 *
 * Призначення: Demos, videos, external content
 *
 * Параметри:
 * - src: URL для iframe
 * - title: Заголовок над iframe (опціонально)
 */

defineProps<{
  src: string
  title?: string
}>()
</script>

<template>
  <div class="slidev-layout iframe-container">
    <div v-if="title || $slots.default" class="iframe-header">
      <h2 v-if="title" class="text-xl font-semibold">{{ title }}</h2>
      <slot />
    </div>
    <iframe
      :src="src"
      class="iframe-content"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>
