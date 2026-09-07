<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { labExperiments } from '@/data/studio';

const route = useRoute();

const experiment = computed(() => labExperiments.find((item) => item.id === route.params.id) ?? labExperiments[0]);
</script>

<template>
  <div class="page detail-page">
    <SectionIntro
      :eyebrow="`Lab / ${experiment.category}`"
      :title="experiment.title"
      :description="experiment.summary"
    />

    <section class="detail-grid">
      <article class="detail-panel detail-panel--hero">
        <p class="section-label">Visual / demo area</p>
        <div class="detail-visual-surface detail-visual-surface--lab">
          <span>{{ experiment.status }}</span>
        </div>
      </article>

      <article class="detail-panel">
        <p class="section-label">Content</p>
        <p class="detail-copy">Space for notes, exploration text and future implementation details.</p>
      </article>

      <article class="detail-panel">
        <p class="section-label">Metadata</p>
        <ul class="detail-list">
          <li>ID: {{ experiment.id }}</li>
          <li>Category: {{ experiment.category }}</li>
          <li>Status: {{ experiment.status }}</li>
        </ul>
      </article>

      <article class="detail-panel detail-panel--wide">
        <p class="section-label">Previous / next</p>
        <div class="detail-nav-row">
          <span>Previous</span>
          <span>Next</span>
        </div>
      </article>
    </section>
  </div>
</template>