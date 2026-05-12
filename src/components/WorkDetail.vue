<script setup lang="ts">
import type { Work, WorkCta } from '../types/work'
import type { UiCopy } from '../i18n/locales'

defineProps<{
  work: Work
  cta: WorkCta
  categoryLabel: string
  copy: UiCopy
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <aside class="work-detail" data-test="work-detail" aria-labelledby="work-detail-title">
    <button
      class="detail-close"
      type="button"
      :aria-label="copy.detailClose"
      @click="$emit('close')"
    >
      {{ copy.detailClose }}
    </button>

    <div class="detail-gallery" :aria-label="copy.detailImageLabel">
      <template v-for="(image, index) in work.images" :key="`${work.slug}-${index}-${image.alt}`">
        <img
          v-if="image.src"
          class="detail-image"
          :src="image.src"
          :alt="image.alt"
          data-test="work-detail-image"
        />
        <div
          v-else
          class="detail-image"
          role="img"
          :aria-label="image.alt"
          :style="{ background: image.gradient }"
          data-test="work-detail-image"
        />
      </template>
    </div>

    <div class="detail-copy">
      <p class="eyebrow">{{ categoryLabel }}</p>
      <h2 id="work-detail-title">{{ work.name }}</h2>
      <p>{{ work.description }}</p>
      <a class="primary-cta" :href="cta.href" target="_blank" rel="noreferrer" data-test="work-cta">
        {{ cta.label }}
      </a>
    </div>
  </aside>
</template>
