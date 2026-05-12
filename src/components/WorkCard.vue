<script setup lang="ts">
import type { Work } from '../types/work'

defineProps<{
  work: Work
  usageCategoryLabel: string
  craftCategoryLabel: string
  featuredLabel: string
}>()

defineEmits<{
  open: [work: Work]
}>()
</script>

<template>
  <article class="work-card" :class="{ featured: work.featured }">
    <button
      class="work-card-button"
      type="button"
      :data-test="`work-card-${work.slug}`"
      @click="$emit('open', work)"
    >
      <img
        v-if="work.images[0]?.src"
        class="work-card-image"
        :src="work.images[0].src"
        :alt="work.images[0].alt"
      />
      <span
        v-else
        class="work-card-image"
        role="img"
        :aria-label="work.images[0]?.alt"
        :style="{ background: work.images[0]?.gradient }"
      />
      <span class="work-card-body">
        <span class="work-meta">
          <span>{{ usageCategoryLabel }}</span>
          <span>{{ craftCategoryLabel }}</span>
          <span v-if="work.featured">{{ featuredLabel }}</span>
        </span>
        <strong>{{ work.name }}</strong>
        <span class="work-description">{{ work.description }}</span>
      </span>
    </button>
  </article>
</template>
