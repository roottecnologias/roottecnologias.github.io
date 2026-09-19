<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { aestheticEntries } from '@/data/studio';

const route = useRoute();

const entry = computed(() => aestheticEntries.find((item) => item.slug === route.params.slug) ?? aestheticEntries[0]);
</script>

<template>
  <div class="page detail-page">
    <RouterLink class="detail-back-link" to="/esteticas">← Back to aesthetics</RouterLink>

    <SectionIntro
      :eyebrow="`Estética / ${entry.number}`"
      :title="entry.title"
      :description="entry.summary"
    />

    <section class="detail-grid">
      <article class="detail-panel detail-panel--hero">
        <p class="section-label">Visual area</p>
        <div class="detail-visual-surface">
          <span>{{ entry.slug }}</span>
        </div>
        <RouterLink class="detail-experience-cta" :to="`/esteticas/${entry.slug}/live`">
          Open full experience ↗
        </RouterLink>
      </article>

      <article class="detail-panel">
        <p class="section-label">Characteristics</p>
        <ul class="detail-list">
          <li>Editorial balance</li>
          <li>Distinct hierarchy</li>
          <li>Quiet but deliberate motion</li>
        </ul>
      </article>

      <article class="detail-panel">
        <p class="section-label">Typography</p>
        <p class="detail-copy">Space reserved for type scale, rhythm and future display choices.</p>
      </article>

      <article class="detail-panel">
        <p class="section-label">Palette</p>
        <p class="detail-copy">Placeholder area for future color study and contrast rules.</p>
      </article>

      <article class="detail-panel">
        <p class="section-label">Interaction notes</p>
        <p class="detail-copy">Where hover, focus and motion details will be documented later.</p>
      </article>

      <article class="detail-panel detail-panel--wide">
        <p class="section-label">Example interface</p>
        <div class="detail-example">
          <span>Interface slot</span>
        </div>
      </article>
    </section>
  </div>
</template>