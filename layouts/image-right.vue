<script setup lang="ts">
/**
 * Image-right layout - content on left, image on right
 *
 * Purpose: Text with supporting photos, diagrams, screenshots
 *
 * Props:
 * - image: Path to the image
 * - backgroundSize: cover (default) or contain
 */

defineProps<{
  image: string
  backgroundSize?: 'cover' | 'contain'
}>()
</script>

<template>
  <div class="slidev-layout image-right-container">
    <div class="image-right-content">
      <slot />
    </div>
    <div
      class="image-right-image"
      :style="{
        backgroundImage: `url(${image})`,
        backgroundSize: backgroundSize || 'cover'
      }"
    />
  </div>
</template>
