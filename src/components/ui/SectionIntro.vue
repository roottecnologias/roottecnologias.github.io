<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <header class="section-intro">
    <p v-if="eyebrow" class="section-intro__eyebrow">{{ eyebrow }}</p>
    <h1 class="section-intro__title">{{ title }}</h1>
    <p class="section-intro__description">{{ description }}</p>
  </header>
</template>