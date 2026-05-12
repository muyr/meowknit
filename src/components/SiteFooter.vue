<script setup lang="ts">
import type { UiCopy } from '../i18n/locales'

defineProps<{
  copy: UiCopy
}>()
</script>

<template>
  <footer class="site-footer">
    <p>{{ copy.footerText }}</p>
    <a href="https://www.instagram.com/meowknit" target="_blank" rel="noreferrer">
      {{ copy.instagramLabel }}
    </a>
  </footer>
</template>
