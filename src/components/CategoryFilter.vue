<script setup lang="ts">
import type { WorkCategory, WorkCategoryId } from '../types/work'

defineProps<{
  categories: WorkCategory[]
  activeCategory: WorkCategoryId | 'all'
  allLabel: string
  navLabel: string
}>()

defineEmits<{
  select: [category: WorkCategoryId | 'all']
}>()
</script>

<template>
  <nav class="category-filter" :aria-label="navLabel">
    <button
      class="category-pill"
      :class="{ active: activeCategory === 'all' }"
      type="button"
      data-test="category-filter-all"
      @click="$emit('select', 'all')"
    >
      {{ allLabel }}
    </button>

    <button
      v-for="category in categories"
      :key="category.id"
      class="category-pill"
      :class="{ active: activeCategory === category.id }"
      type="button"
      :data-test="`category-filter-${category.id}`"
      @click="$emit('select', category.id)"
    >
      {{ category.label }}
    </button>
  </nav>
</template>
