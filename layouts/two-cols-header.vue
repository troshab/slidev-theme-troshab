<script setup lang="ts">
/**
 * Two-cols-header layout - header row + two columns below
 *
 * Purpose: Title/header with two columns of content beneath
 *
 * Props:
 * - columns: is-6 (50:50, default), is-4 (33:67), is-3 (25:75), is-8 (67:33), is-9 (75:25)
 * - gap: 0, 1, 2, 4, 6, 8 (rem units, default: 4)
 * - align: top, center, bottom (vertical alignment, default: top)
 */

defineProps<{
  columns?: 'is-3' | 'is-4' | 'is-5' | 'is-6' | 'is-7' | 'is-8' | 'is-9'
  gap?: '0' | '1' | '2' | '4' | '6' | '8'
  align?: 'top' | 'center' | 'bottom'
}>()

const colWidths: Record<string, [number, number]> = {
  'is-3': [3, 9],
  'is-4': [4, 8],
  'is-5': [5, 7],
  'is-6': [6, 6],
  'is-7': [7, 5],
  'is-8': [8, 4],
  'is-9': [9, 3],
}

const gapClasses: Record<string, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
}

const alignClasses: Record<string, string> = {
  'top': 'items-start',
  'center': 'items-center',
  'bottom': 'items-end',
}
</script>

<template>
  <div class="slidev-layout slide-content flex flex-col">
    <div v-if="$slots.header" class="two-cols-header-title mb-4">
      <slot name="header" />
    </div>

    <div
      class="two-cols-grid flex-1"
      :class="[
        gapClasses[gap || '4'],
        alignClasses[align || 'top']
      ]"
    >
      <div
        class="two-cols-left"
        :class="`col-span-${colWidths[columns || 'is-6'][0]}`"
      >
        <slot name="left" />
      </div>
      <div
        class="two-cols-right"
        :class="`col-span-${colWidths[columns || 'is-6'][1]}`"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
