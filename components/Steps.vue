<script setup lang="ts">
/**
 * Steps component - step-by-step progress visualization
 *
 * Modes:
 * - static: shows steps with manual `current` prop (default)
 * - clicks: advances step on each Slidev click (v-click integration)
 * - tabs: clickable steps, user can jump to any step
 *
 * Usage:
 *
 * Static (current behavior):
 * <Steps :items="['Plan', 'Build', 'Test']" :current="2" />
 *
 * Clicks mode (advances with presentation clicks):
 * <Steps :items="['Plan', 'Build', 'Test']" mode="clicks">
 *   <template #step1>Planning content...</template>
 *   <template #step2>Building content...</template>
 *   <template #step3>Testing content...</template>
 * </Steps>
 *
 * Tabs mode (clickable steps):
 * <Steps :items="['Plan', 'Build', 'Test']" mode="tabs">
 *   <template #step1>Planning content...</template>
 *   <template #step2>Building content...</template>
 *   <template #step3>Testing content...</template>
 * </Steps>
 *
 * MDC syntax (with mdc: true in frontmatter):
 * ::Steps{:items="['Plan', 'Build', 'Test']" mode="tabs"}
 * #step1
 * ### Planning
 * - Define requirements
 *
 * #step2
 * ### Building
 * Code implementation here.
 * ::
 */

import type { ClicksContext } from '@slidev/types'
import { computed, inject, ref, useSlots, type Ref } from 'vue'

const props = defineProps<{
  items: string[]
  current?: number
  mode?: 'static' | 'clicks' | 'tabs'
}>()

const slots = useSlots()

// For tabs mode - internal state
const tabIndex = ref(1)

// Get Slidev's clicks context (injected by SlideWrapper)
const defaultClicksContext: ClicksContext = {
  current: 0,
  clicksStart: 0,
  total: 0,
  isMounted: false,
  currentOffset: 0,
  relativeSizeMap: new Map(),
  maxMap: new Map(),
  setup: () => {},
  calculateSince: () => null,
  calculateRange: () => null,
  calculate: () => null,
  register: () => {},
  unregister: () => {},
}
const clicksContext = inject<Ref<ClicksContext>>('$$slidev-clicks-context', ref(defaultClicksContext))

// Determine the active step based on mode
const activeStep = computed(() => {
  if (props.mode === 'clicks') {
    // In clicks mode, step advances with each click (1-indexed)
    // Click 0 = step 1, click 1 = step 2, etc.
    const clicks = clicksContext.value?.current ?? 0
    const clickStep = clicks + 1
    return Math.min(clickStep, props.items.length)
  }
  if (props.mode === 'tabs') {
    return tabIndex.value
  }
  // Static mode - use current prop
  return props.current
})

// Check if we have content slots (using step1, step2, etc. naming for MDC compatibility)
const hasContent = computed(() => {
  return props.items.some((_, index) => slots[`step${index + 1}`])
})

// Handle tab click
function selectStep(index: number) {
  if (props.mode === 'tabs') {
    tabIndex.value = index
  }
}

// Check if step is clickable
const isClickable = computed(() => props.mode === 'tabs')
</script>

<template>
  <div class="steps-wrapper">
    <!-- Steps indicator -->
    <div class="steps-container">
      <template v-for="(item, index) in items" :key="index">
        <div
          class="step-item"
          :class="{ 'is-clickable': isClickable }"
          @click="selectStep(index + 1)"
        >
          <div
            class="step-circle"
            :class="{
              'active': index + 1 === activeStep,
              'completed': activeStep !== undefined && index + 1 < activeStep,
            }"
          >
            <template v-if="activeStep !== undefined && index + 1 < activeStep">
              <svg class="step-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </template>
            <template v-else>
              {{ index + 1 }}
            </template>
          </div>
          <span class="step-label">{{ item }}</span>
        </div>
        <div
          v-if="index < items.length - 1"
          class="step-connector"
          :class="{ 'completed': activeStep !== undefined && index + 1 < activeStep }"
        />
      </template>
    </div>

    <!-- Content area (only for clicks/tabs modes with slots) -->
    <div v-if="hasContent && (mode === 'clicks' || mode === 'tabs')" class="steps-content">
      <Transition name="step-content" mode="out-in">
        <div
          v-if="activeStep !== undefined"
          :key="activeStep"
          class="step-content-panel"
        >
          <slot :name="`step${activeStep}`" />
        </div>
      </Transition>
    </div>
  </div>
</template>
