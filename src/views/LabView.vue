<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { labExperiments } from '@/data/studio';
import { useLabStorage } from '@/composables/useLabStorage';

const storage = useLabStorage();
const experiments = storage.experiments;
</script>

<template>
  <div class="page lab-page">
    <SectionIntro
      eyebrow="Lab"
      title="A place for experiments we make for ourselves."
      description="This is the working shelf for concepts, prototypes and systems that can later become bigger pieces."
    />

    <section class="filter-strip" aria-label="Lab filters preparados">
      <button type="button" class="filter-chip is-active">All</button>
      <button type="button" class="filter-chip">Interface</button>
      <button type="button" class="filter-chip">Motion</button>
      <button type="button" class="filter-chip">System</button>
      <button type="button" class="filter-chip">Draft</button>
    </section>

    <section class="lab-grid" aria-label="Listado de experimentos">
      <RouterLink
        v-for="experiment in experiments.length ? experiments : labExperiments"
        :key="experiment.id"
        :to="`/lab/${experiment.id}`"
        class="lab-card"
      >
        <div class="lab-card__meta">
          <span>{{ experiment.category }}</span>
          <span>{{ experiment.status }}</span>
          <span>{{ experiment.year ?? '2026' }}</span>
        </div>
        <h2>{{ experiment.title }}</h2>
        <p>{{ experiment.summary }}</p>
      </RouterLink>
    </section>
  </div>
</template>