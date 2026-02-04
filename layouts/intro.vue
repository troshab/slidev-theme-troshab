<script setup lang="ts">
/**
 * Intro layout - представлення спікера
 *
 * Призначення: Фото + біо спікера/автора
 *
 * Параметри:
 * - image: URL/шлях до фото
 * - name: Ім'я
 * - title: Посада/роль
 * - side: left (фото зліва) або right (фото справа, default)
 */

defineProps<{
  image?: string
  name?: string
  title?: string
  side?: 'left' | 'right'
}>()
</script>

<template>
  <div class="slidev-layout h-full w-full flex items-center justify-center p-12">
    <div
      class="flex items-center gap-12 max-w-4xl"
      :class="side === 'left' ? 'flex-row' : 'flex-row-reverse'"
    >
      <div v-if="image" class="flex-shrink-0">
        <img
          :src="image"
          :alt="name || 'Speaker'"
          class="w-48 h-48 rounded-full object-cover shadow-xl"
        />
      </div>
      <div v-else class="flex-shrink-0">
        <div class="intro-avatar w-48 h-48 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
          {{ name?.[0] || '?' }}
        </div>
      </div>
      <div :class="side === 'left' ? 'text-left' : 'text-right'">
        <h1 v-if="name" class="text-4xl font-bold mb-2">{{ name }}</h1>
        <p v-if="title" class="text-xl opacity-70 mb-4">{{ title }}</p>
        <div class="opacity-80">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-avatar {
  background: var(--gradient-primary);
}
</style>
