<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { aestheticEntries } from '@/data/studio';

const route = useRoute();
const entry = computed(() => aestheticEntries.find((item) => item.slug === route.params.slug) ?? aestheticEntries[0]);
</script>

<template>
  <div class="page aesthetic-live-placeholder">
    <RouterLink class="detail-back-link" :to="`/esteticas/${entry.slug}`">← Back to aesthetic</RouterLink>

    <section class="aesthetic-live-placeholder__content" aria-labelledby="live-title">
      <p class="section-label">Full experience</p>
      <h1 id="live-title">{{ entry.title }}</h1>
      <p>The full aesthetic experience will be built here.</p>
    </section>
  </div>
</template>