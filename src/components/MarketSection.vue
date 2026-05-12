<script setup lang="ts">
import type { UiCopy } from '../i18n/locales'

defineProps<{
  copy: UiCopy
}>()
</script>

<template>
  <section class="market-section" aria-labelledby="market-title">
    <p class="eyebrow">{{ copy.marketEyebrow }}</p>
    <h2 id="market-title">{{ copy.marketTitle }}</h2>
    <p>{{ copy.marketBody }}</p>
  </section>
</template>
