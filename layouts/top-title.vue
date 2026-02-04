<script setup lang="ts">
/**
 * Top-title layout - заголовок у смузі зверху
 *
 * Призначення: Виділення ключових слайдів
 */
</script>

<template>
  <div class="slidev-layout flex flex-col h-full">
    <div class="top-title-bar">
      <slot name="title" />
    </div>
    <div class="top-title-content">
      <slot />
    </div>
  </div>
</template>
