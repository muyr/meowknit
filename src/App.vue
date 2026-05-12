<script setup lang="ts">
import { computed, ref } from 'vue'
import CategoryFilter from './components/CategoryFilter.vue'
import HeroSection from './components/HeroSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import WorkDetail from './components/WorkDetail.vue'
import WorkGrid from './components/WorkGrid.vue'
import { categories, getWorkCta, works } from './data/works'
import type { Work, WorkCategoryId } from './types/work'

const activeCategory = ref<WorkCategoryId | 'all'>('all')
const selectedWork = ref<Work | null>(null)

const filteredWorks = computed(() => {
  if (activeCategory.value === 'all') {
    return works
  }

  return works.filter((work) => work.category === activeCategory.value)
})

function selectCategory(category: WorkCategoryId | 'all') {
  activeCategory.value = category
  selectedWork.value = null
}

function getCategoryLabel(categoryId: WorkCategoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? '作品'
}
</script>

<template>
  <div class="site-shell">
    <main>
      <HeroSection />

      <CategoryFilter
        :categories="categories"
        :active-category="activeCategory"
        @select="selectCategory"
      />

      <WorkGrid
        :works="filteredWorks"
        :get-category-label="getCategoryLabel"
        @open="selectedWork = $event"
      />

      <WorkDetail
        v-if="selectedWork"
        :work="selectedWork"
        :category-label="getCategoryLabel(selectedWork.category)"
        :cta="getWorkCta(selectedWork)"
        @close="selectedWork = null"
      />
    </main>

    <SiteFooter />
  </div>
</template>
