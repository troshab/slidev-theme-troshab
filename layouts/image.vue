<script setup lang="ts">
/**
 * Image layout - зображення з caption
 *
 * Призначення: Фото, діаграми, скріншоти з підписом
 *
 * Параметри:
 * - image: Шлях до зображення
 * - caption: bottom (default) або overlay
 */

defineProps<{
  image: string
  caption?: 'bottom' | 'overlay'
}>()
</script>

<template>
  <div class="slidev-layout image-container relative">
    <div class="image-main">
      <img :src="image" alt="" />
    </div>
    <div
      v-if="$slots.default"
      :class="caption === 'overlay' ? 'image-caption-overlay' : 'image-caption'"
    >
      <slot />
    </div>
  </div>
</template>
