<script setup lang="ts">
/**
 * Quote layout - цитата
 *
 * Призначення: Цитати, афоризми, ключові висловлювання
 *
 * Параметри:
 * - author: Ім'я автора
 * - source: Джерело цитати
 */

defineProps<{
  author?: string
  source?: string
}>()
</script>

<template>
  <div class="slidev-layout quote-container">
    <div class="quote-text">
      <slot />
    </div>
    <div v-if="author || source" class="quote-author">
      <span v-if="author">— {{ author }}</span>
      <span v-if="author && source">, </span>
      <span v-if="source" class="italic">{{ source }}</span>
    </div>
  </div>
</template>
