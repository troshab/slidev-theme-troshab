<script setup lang="ts">
/**
 * Iframe-right layout - content on left, iframe on right
 *
 * Purpose: Explanatory text with supporting demos or videos
 *
 * Props:
 * - src: URL for the iframe
 * - title: Optional title for accessibility
 */

defineProps<{
  src: string
  title?: string
}>()
</script>

<template>
  <div class="slidev-layout iframe-right-container">
    <div class="iframe-right-content">
      <slot />
    </div>
    <iframe
      :src="src"
      :title="title || 'Embedded content'"
      class="iframe-right-frame"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>
