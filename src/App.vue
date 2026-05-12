<script setup lang="ts">
import { computed, ref } from 'vue'
import AboutSection from './components/AboutSection.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import HeroSection from './components/HeroSection.vue'
import MarketSection from './components/MarketSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import WorkDetail from './components/WorkDetail.vue'
import WorkGrid from './components/WorkGrid.vue'
import { getCategories, getWorkCta, getWorks } from './content/catalog'
import { uiCopy, type Locale } from './i18n/locales'
import { getLocaleFromPath, getLocalePath, getPageFromPath, type PageId } from './i18n/routing'
import type { Work, WorkCategoryId } from './types/work'

const currentLocale = ref<Locale>(getLocaleFromPath(window.location.pathname))
const currentPage = ref<PageId>(getPageFromPath(window.location.pathname))
const activeCategory = ref<WorkCategoryId | 'all'>('all')
const selectedWork = ref<Work | null>(null)

const copy = computed(() => uiCopy[currentLocale.value])
const categories = computed(() => getCategories(currentLocale.value))
const works = computed(() => getWorks(currentLocale.value))
const navPaths = computed<Record<PageId, string>>(() => ({
  home: getLocalePath(currentLocale.value, 'home'),
  about: getLocalePath(currentLocale.value, 'about'),
  works: getLocalePath(currentLocale.value, 'works'),
  market: getLocalePath(currentLocale.value, 'market'),
}))

const filteredWorks = computed(() => {
  if (activeCategory.value === 'all') {
    return works.value
  }

  return works.value.filter((work) => work.category === activeCategory.value)
})

function selectCategory(category: WorkCategoryId | 'all') {
  activeCategory.value = category
  selectedWork.value = null
}

function getCategoryLabel(categoryId: WorkCategoryId) {
  return (
    categories.value.find((category) => category.id === categoryId)?.label ?? copy.value.categoryFallback
  )
}

function switchLocale(locale: Locale) {
  currentLocale.value = locale
  selectedWork.value = null
  window.history.pushState({}, '', getLocalePath(locale, currentPage.value))
}

function navigateTo(page: PageId) {
  currentPage.value = page
  selectedWork.value = null
  window.history.pushState({}, '', getLocalePath(currentLocale.value, page))
}
</script>

<template>
  <div class="site-shell">
    <SiteHeader
      :copy="copy"
      :current-locale="currentLocale"
      :current-page="currentPage"
      :nav-paths="navPaths"
      @switch-locale="switchLocale"
      @navigate="navigateTo"
    />

    <main>
      <HeroSection v-if="currentPage === 'home'" :copy="copy" />

      <AboutSection v-if="currentPage === 'about'" :copy="copy" />

      <MarketSection v-if="currentPage === 'market'" :copy="copy" />

      <template v-if="currentPage === 'works'">
        <CategoryFilter
          :categories="categories"
          :active-category="activeCategory"
          :all-label="copy.allWorks"
          :nav-label="copy.categoryNavLabel"
          @select="selectCategory"
        />

        <WorkGrid
          :works="filteredWorks"
          :get-category-label="getCategoryLabel"
          :copy="copy"
          @open="selectedWork = $event"
        />

        <WorkDetail
          v-if="selectedWork"
          :work="selectedWork"
          :category-label="getCategoryLabel(selectedWork.category)"
          :cta="getWorkCta(selectedWork, currentLocale)"
          :copy="copy"
          @close="selectedWork = null"
        />
      </template>
    </main>

    <SiteFooter :copy="copy" />
  </div>
</template>
