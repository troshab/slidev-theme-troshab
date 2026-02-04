<script setup lang="ts">
/**
 * Fact layout - велика цифра/факт
 *
 * Призначення: KPI, статистика, ключовий факт
 *
 * Параметри:
 * - value: Основне значення (цифра, текст)
 * - label: Підпис під значенням
 * - source: Джерело даних
 */

defineProps<{
  value?: string
  label?: string
  source?: string
}>()
</script>

<template>
  <div class="slidev-layout h-full w-full flex flex-col items-center justify-center p-12 text-center">
    <div v-if="value" class="fact-value text-8xl font-bold mb-4">
      {{ value }}
    </div>
    <div v-if="label" class="fact-label text-2xl opacity-80 mb-6">
      {{ label }}
    </div>
    <div class="max-w-2xl">
      <slot />
    </div>
    <div v-if="source" class="absolute bottom-8 text-sm opacity-50">
      {{ source }}
    </div>
  </div>
</template>

<style scoped>
.fact-value {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
