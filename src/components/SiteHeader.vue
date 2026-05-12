<script setup lang="ts">
import brandLogoUrl from '../assets/brand-logo.png'
import type { Locale, UiCopy } from '../i18n/locales'
import type { PageId } from '../i18n/routing'

defineProps<{
  copy: UiCopy
  currentLocale: Locale
  currentPage: PageId
  navPaths: Record<PageId, string>
}>()

defineEmits<{
  switchLocale: [locale: Locale]
  navigate: [page: PageId]
}>()
</script>

<template>
  <header class="site-header" data-test="site-header">
    <a
      class="header-brand"
      :href="navPaths.home"
      aria-label="Meowknit home"
      @click.prevent="$emit('navigate', 'home')"
    >
      <img :src="brandLogoUrl" :alt="copy.heroLogoAlt" />
      <span>Meowknit</span>
    </a>

    <nav class="site-nav" aria-label="Main navigation">
      <a
        :href="navPaths.home"
        :aria-current="currentPage === 'home' ? 'page' : undefined"
        data-test="nav-home"
        @click.prevent="$emit('navigate', 'home')"
      >
        {{ copy.navHome }}
      </a>
      <a
        :href="navPaths.works"
        :aria-current="currentPage === 'works' ? 'page' : undefined"
        data-test="nav-works"
        @click.prevent="$emit('navigate', 'works')"
      >
        {{ copy.navWorks }}
      </a>
      <a
        :href="navPaths.about"
        :aria-current="currentPage === 'about' ? 'page' : undefined"
        data-test="nav-about"
        @click.prevent="$emit('navigate', 'about')"
      >
        {{ copy.navAbout }}
      </a>
      <a :href="copy.etsyShopUrl" target="_blank" rel="noreferrer" data-test="nav-etsy">
        {{ copy.navEtsy }}
      </a>
      <a
        :href="navPaths.market"
        :aria-current="currentPage === 'market' ? 'page' : undefined"
        data-test="nav-market"
        @click.prevent="$emit('navigate', 'market')"
      >
        {{ copy.navMarket }}
      </a>
    </nav>

    <div class="language-switch header-language-switch" :aria-label="copy.languageSwitcherLabel">
      <button
        type="button"
        :class="{ active: currentLocale === 'zh-CN' }"
        :aria-pressed="currentLocale === 'zh-CN'"
        data-test="locale-switch-zh-CN"
        @click="$emit('switchLocale', 'zh-CN')"
      >
        简体中文
      </button>
      <button
        type="button"
        :class="{ active: currentLocale === 'en' }"
        :aria-pressed="currentLocale === 'en'"
        data-test="locale-switch-en"
        @click="$emit('switchLocale', 'en')"
      >
        English
      </button>
    </div>
  </header>
</template>
