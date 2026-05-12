<script setup lang="ts">
import type { UiCopy } from '../i18n/locales'

defineProps<{
  copy: UiCopy
}>()
</script>

<template>
  <section id="about" class="about-section" aria-labelledby="about-title">
    <p class="eyebrow">{{ copy.aboutEyebrow }}</p>
    <h2 id="about-title">{{ copy.aboutTitle }}</h2>
    <p>{{ copy.aboutBody }}</p>
  </section>
</template>
