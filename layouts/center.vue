<script setup lang="ts">
/**
 * Center layout - центрований контент
 *
 * Призначення: Центрований контент без фону (на відміну від section)
 */
</script>

<template>
  <div class="slidev-layout h-full w-full flex items-center justify-center p-8">
    <div class="text-center">
      <slot />
    </div>
  </div>
</template>
