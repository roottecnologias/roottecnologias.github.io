<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { aestheticEntries } from '@/data/studio';
</script>

<template>
  <div class="page gallery-page">
    <SectionIntro
      eyebrow="Estéticas"
      title="Visual directions in progress."
      description="A gallery framework for future studies, compositions and design explorations. Each entry can later become a different atmosphere."
    />

    <section class="gallery-grid" aria-label="Galería de estéticas">
      <RouterLink
        v-for="entry in aestheticEntries"
        :key="entry.slug"
        :to="`/esteticas/${entry.slug}`"
        class="gallery-entry"
      >
        <figure class="gallery-entry__media">
          <img :src="entry.image" :alt="`${entry.title} placeholder preview`" loading="lazy" />
          <span class="gallery-entry__action">View Aesthetic →</span>
        </figure>

        <div class="gallery-entry__body">
          <p class="gallery-entry__number">{{ entry.number }}</p>
          <h2>{{ entry.title }}</h2>
          <p class="gallery-entry__summary">{{ entry.summary }}</p>
          <div class="tag-row">
            <span v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </RouterLink>
    </section>
  </div>
</template>