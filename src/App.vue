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
import { getCraftCategories, getUsageCategories, getWorkCta, getWorks } from './content/catalog'
import { uiCopy, type Locale } from './i18n/locales'
import {
  getLocaleFromPath,
  getLocalePath,
  getPageFromPath,
  getWorkSlugFromPath,
  type PageId,
} from './i18n/routing'
import type { CraftCategoryId, UsageCategoryId, Work, WorkCategoryId } from './types/work'

const currentLocale = ref<Locale>(getLocaleFromPath(window.location.pathname))
const currentPage = ref<PageId>(getPageFromPath(window.location.pathname))
const currentWorkSlug = ref<string | null>(getWorkSlugFromPath(window.location.pathname))
const activeUsageCategory = ref<UsageCategoryId | 'all'>('all')
const activeCraftCategory = ref<CraftCategoryId | 'all'>('all')

const copy = computed(() => uiCopy[currentLocale.value])
const usageCategories = computed(() => getUsageCategories(currentLocale.value))
const craftCategories = computed(() => getCraftCategories(currentLocale.value))
const works = computed(() => getWorks(currentLocale.value))
const featuredWorks = computed(() => works.value.filter((work) => work.featured))
const selectedWork = computed(() => {
  if (!currentWorkSlug.value) {
    return null
  }

  return works.value.find((work) => work.slug === currentWorkSlug.value) ?? null
})
const navPaths = computed<Record<PageId, string>>(() => ({
  home: getLocalePath(currentLocale.value, 'home'),
  about: getLocalePath(currentLocale.value, 'about'),
  works: getLocalePath(currentLocale.value, 'works'),
  market: getLocalePath(currentLocale.value, 'market'),
}))

const filteredWorks = computed(() => {
  return works.value.filter((work) => {
    const matchesUsage =
      activeUsageCategory.value === 'all' || work.usageCategory.id === activeUsageCategory.value
    const matchesCraft =
      activeCraftCategory.value === 'all' || work.craftCategory.id === activeCraftCategory.value

    return matchesUsage && matchesCraft
  })
})

function selectUsageCategory(category: WorkCategoryId | 'all') {
  activeUsageCategory.value = category as UsageCategoryId | 'all'
  currentWorkSlug.value = null
}

function selectCraftCategory(category: WorkCategoryId | 'all') {
  activeCraftCategory.value = category as CraftCategoryId | 'all'
  currentWorkSlug.value = null
}

function openWork(work: Work) {
  currentPage.value = 'works'
  currentWorkSlug.value = work.slug
  window.history.pushState({}, '', getLocalePath(currentLocale.value, 'works', work.slug))
}

function closeWorkDetail() {
  currentPage.value = 'works'
  currentWorkSlug.value = null
  window.history.pushState({}, '', getLocalePath(currentLocale.value, 'works'))
}

function switchLocale(locale: Locale) {
  currentLocale.value = locale
  window.history.pushState(
    {},
    '',
    getLocalePath(locale, currentPage.value, currentWorkSlug.value ?? undefined),
  )
}

function navigateTo(page: PageId) {
  currentPage.value = page
  currentWorkSlug.value = null
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
      <template v-if="currentPage === 'home'">
        <HeroSection :copy="copy" />

        <WorkGrid
          :works="featuredWorks"
          :copy="copy"
          @open="openWork"
        />
      </template>

      <AboutSection v-if="currentPage === 'about'" :copy="copy" />

      <MarketSection v-if="currentPage === 'market'" :copy="copy" />

      <template v-if="currentPage === 'works' && !selectedWork">
        <div class="category-filter-panel">
          <CategoryFilter
            :categories="usageCategories"
            :active-category="activeUsageCategory"
            :title="copy.usageCategoryTitle"
            :all-label="copy.allWorks"
            :nav-label="copy.usageCategoryNavLabel"
            test-id-prefix="usage"
            @select="selectUsageCategory"
          />

          <CategoryFilter
            :categories="craftCategories"
            :active-category="activeCraftCategory"
            :title="copy.craftCategoryTitle"
            :all-label="copy.allWorks"
            :nav-label="copy.craftCategoryNavLabel"
            test-id-prefix="craft"
            @select="selectCraftCategory"
          />
        </div>

        <WorkGrid
          :works="filteredWorks"
          :copy="copy"
          @open="openWork"
        />

      </template>

      <WorkDetail
        v-if="selectedWork"
        :work="selectedWork"
        :usage-category-label="selectedWork.usageCategory.label"
        :craft-category-label="selectedWork.craftCategory.label"
        :cta="getWorkCta(selectedWork, currentLocale)"
        :copy="copy"
        @close="closeWorkDetail"
      />
    </main>

    <SiteFooter :copy="copy" />
  </div>
</template>
