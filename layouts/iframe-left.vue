<script setup lang="ts">
/**
 * Iframe-left layout - iframe on left, content on right
 *
 * Purpose: Demos, videos, external content with explanatory text
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
  <div class="slidev-layout iframe-left-container">
    <iframe
      :src="src"
      :title="title || 'Embedded content'"
      class="iframe-left-frame"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <div class="iframe-left-content">
      <slot />
    </div>
  </div>
</template>
