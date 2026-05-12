<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Work, WorkCta } from '../types/work'
import type { UiCopy } from '../i18n/locales'

const props = defineProps<{
  work: Work
  cta: WorkCta
  usageCategoryLabel: string
  craftCategoryLabel: string
  copy: UiCopy
}>()

defineEmits<{
  close: []
}>()

const activeImageIndex = ref(0)
const activeImage = computed(() => props.work.images[activeImageIndex.value] ?? props.work.images[0])
const activeVariantId = computed(() => {
  return props.work.variants?.find((variant) => variant.imageIndex === activeImageIndex.value)?.id
})

watch(
  () => props.work.slug,
  () => {
    activeImageIndex.value = 0
  },
)

function selectImage(index: number) {
  activeImageIndex.value = index
}
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

    <div class="detail-main-row" data-test="work-detail-main-row">
      <div class="detail-gallery" :aria-label="copy.detailImageLabel">
        <div class="detail-active-media">
          <img
            v-if="activeImage?.src"
            class="detail-image"
            :src="activeImage.src"
            :alt="activeImage.alt"
            data-test="work-detail-active-image"
          />
          <div
            v-else
            class="detail-image"
            role="img"
            :aria-label="activeImage?.alt"
            :style="{ background: activeImage?.gradient }"
            data-test="work-detail-active-image"
          />
        </div>

        <div class="detail-thumbnails" aria-label="Work image thumbnails">
          <button
            v-for="(image, index) in work.images"
            :key="`${work.slug}-thumbnail-${index}-${image.alt}`"
            class="detail-thumbnail"
            :class="{ active: activeImageIndex === index }"
            type="button"
            :aria-label="image.alt"
            :aria-pressed="activeImageIndex === index"
            data-test="work-detail-thumbnail"
            @click="selectImage(index)"
          >
            <img v-if="image.src" :src="image.src" :alt="image.alt" />
            <span v-else :style="{ background: image.gradient }" />
          </button>
        </div>
      </div>

      <div class="detail-copy">
        <p class="eyebrow">{{ usageCategoryLabel }} · {{ craftCategoryLabel }}</p>
        <h2 id="work-detail-title">{{ work.name }}</h2>
        <p>{{ work.description }}</p>

        <div v-if="work.variants?.length" class="detail-variants" aria-label="Work variants">
          <button
            v-for="variant in work.variants"
            :key="variant.id"
            class="variant-pill"
            :class="{ active: activeVariantId === variant.id }"
            type="button"
            :aria-pressed="activeVariantId === variant.id"
            :data-test="`work-variant-${variant.id}`"
            @click="selectImage(variant.imageIndex)"
          >
            {{ variant.label }}
          </button>
        </div>

        <a class="primary-cta" :href="cta.href" target="_blank" rel="noreferrer" data-test="work-cta">
          {{ cta.label }}
        </a>
      </div>
    </div>

    <video
      v-if="work.videoSrc"
      class="detail-video"
      :src="work.videoSrc"
      controls
      playsinline
      data-test="work-local-video"
    />

    <iframe
      v-else-if="work.youtubeVideoId"
      class="detail-video"
      :src="`https://www.youtube.com/embed/${work.youtubeVideoId}`"
      :title="`${work.name} video`"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      data-test="work-video"
    />
  </aside>
</template>
