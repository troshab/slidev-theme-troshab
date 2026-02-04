<script setup lang="ts">
/**
 * Tags component - теги/мітки
 *
 * Використання:
 * <Tags :items="['Vue', 'TypeScript', 'Slidev']" />
 */

defineProps<{
  items: string[]
}>()
</script>

<template>
  <div class="tags-container">
    <span v-for="item in items" :key="item" class="tag">
      {{ item }}
    </span>
  </div>
</template>
