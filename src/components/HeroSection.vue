<script setup lang="ts">
import brandLogoUrl from '../assets/brand-logo.png'
import type { UiCopy } from '../i18n/locales'

defineProps<{
  copy: UiCopy
}>()
</script>

<template>
  <section id="home" class="hero-section" aria-labelledby="brand-title">
    <div class="hero-copy">
      <p class="eyebrow">{{ copy.heroEyebrow }}</p>
      <h1 id="brand-title">{{ copy.heroTitle }}</h1>
      <p class="intro">{{ copy.heroIntro }}</p>
    </div>

    <div class="hero-visual" :aria-label="copy.heroVisualLabel">
      <div class="hero-visual-main">
        <img
          class="brand-logo"
          :src="brandLogoUrl"
          :alt="copy.heroLogoAlt"
          data-test="brand-logo"
        />
        <span>{{ copy.heroTextureLabel }}</span>
      </div>
      <div class="hero-visual-note">
        <strong>6</strong>
        <span>{{ copy.heroCountLabel }}</span>
      </div>
    </div>
  </section>
</template>
