<script setup lang="ts">
/**
 * Image-left layout - image on left, content on right
 *
 * Purpose: Photos, diagrams, screenshots with text on the right
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
  <div class="slidev-layout image-left-container">
    <div
      class="image-left-image"
      :style="{
        backgroundImage: `url(${image})`,
        backgroundSize: backgroundSize || 'cover'
      }"
    />
    <div class="image-left-content">
      <slot />
    </div>
  </div>
</template>
