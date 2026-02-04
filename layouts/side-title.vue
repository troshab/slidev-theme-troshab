<script setup lang="ts">
/**
 * Side-title layout - заголовок збоку
 *
 * Призначення: Драматичний акцент, ключові концепції
 *
 * Параметри:
 * - side: left (default) або right
 * - titleWidth: is-4 (33%, default) або is-3 (25%)
 */

defineProps<{
  side?: 'left' | 'right'
  titleWidth?: 'is-3' | 'is-4'
}>()

const getGridCols = (width: string = 'is-4') => {
  return width === 'is-3' ? 'grid-cols-[25%_75%]' : 'grid-cols-[33%_67%]'
}

const getGridColsReverse = (width: string = 'is-4') => {
  return width === 'is-3' ? 'grid-cols-[75%_25%]' : 'grid-cols-[67%_33%]'
}
</script>

<template>
  <div
    class="slidev-layout side-title-grid"
    :class="side === 'right' ? getGridColsReverse(titleWidth) : getGridCols(titleWidth)"
  >
    <template v-if="side !== 'right'">
      <div class="side-title-title">
        <div class="text-center">
          <slot name="title" />
        </div>
      </div>
      <div class="side-title-content">
        <slot />
      </div>
    </template>
    <template v-else>
      <div class="side-title-content">
        <slot />
      </div>
      <div class="side-title-title">
        <div class="text-center">
          <slot name="title" />
        </div>
      </div>
    </template>
  </div>
</template>
