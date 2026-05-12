<script setup lang="ts">
import type { Work } from '../types/work'
import WorkCard from './WorkCard.vue'

defineProps<{
  works: Work[]
  getCategoryLabel: (categoryId: Work['category']) => string
}>()

defineEmits<{
  open: [work: Work]
}>()
</script>

<template>
  <section class="portfolio-section" aria-labelledby="portfolio-title">
    <div class="section-heading">
      <p class="eyebrow">Portfolio</p>
      <h2 id="portfolio-title">精选作品与作品集</h2>
    </div>

    <div class="work-grid">
      <WorkCard
        v-for="work in works"
        :key="work.slug"
        :work="work"
        :category-label="getCategoryLabel(work.category)"
        @open="$emit('open', $event)"
      />
    </div>
  </section>
</template>
