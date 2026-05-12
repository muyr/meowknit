<script setup lang="ts">
import type { Work } from '../types/work'
import type { UiCopy } from '../i18n/locales'
import WorkCard from './WorkCard.vue'

defineProps<{
  works: Work[]
  copy: UiCopy
}>()

defineEmits<{
  open: [work: Work]
}>()
</script>

<template>
  <section id="works" class="portfolio-section" aria-labelledby="portfolio-title">
    <div class="section-heading">
      <p class="eyebrow">{{ copy.portfolioEyebrow }}</p>
      <h2 id="portfolio-title">{{ copy.portfolioTitle }}</h2>
    </div>

    <div class="work-grid">
      <WorkCard
        v-for="work in works"
        :key="work.slug"
        :work="work"
        :usage-category-label="work.usageCategory.label"
        :craft-category-label="work.craftCategory.label"
        :featured-label="copy.featuredLabel"
        @open="$emit('open', $event)"
      />
    </div>
  </section>
</template>
