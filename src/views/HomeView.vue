<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { aestheticEntries, studioMembers } from '@/data/studio';
</script>

<template>
  <div class="page home-page">
    <section class="hero-block">
      <p class="hero-block__eyebrow">Creative studio / technology / moving images</p>
      <h1 class="hero-block__title">We build calm, strange, precise digital things.</h1>
      <p class="hero-block__lede">
        Root Tecnologias is a three-person studio shaping identities, interfaces and experiments with
        equal attention to rhythm, code and atmosphere.
      </p>
    </section>

    <section class="intro-panel surface-panel">
      <SectionIntro
        eyebrow="Studio note"
        title="Small team. Tight decisions. No filler."
        description="We like digital work that feels composed rather than inflated. The site, the systems and the experiments all live in the same visual language."
      />
    </section>

    <section class="members-grid" aria-labelledby="members-title">
      <h2 id="members-title" class="section-label">The three of us</h2>
      <article
        v-for="(member, index) in studioMembers"
        :key="member.name"
        class="member-card"
        :class="[`member-card--${member.offset ?? 'left'}`]"
      >
        <p class="member-card__index">0{{ index + 1 }}</p>
        <h3>{{ member.name }}</h3>
        <p class="member-card__role">{{ member.role }}</p>
        <p class="member-card__bio">{{ member.bio }}</p>
      </article>
    </section>

    <section class="split-preview">
      <RouterLink to="/esteticas" class="preview-block preview-block--gallery">
        <p class="preview-block__eyebrow">Estéticas</p>
        <h2>Different visual directions, held in one place.</h2>
        <p>Frameworks for future studies, each with room to become its own world.</p>
        <span class="preview-block__cta">Open gallery</span>
      </RouterLink>

      <RouterLink to="/lab" class="preview-block preview-block--lab">
        <p class="preview-block__eyebrow">Lab</p>
        <h2>Things we built because we wanted to know if we could.</h2>
        <p>Experiments, prototypes and small systems ready to grow later.</p>
        <span class="preview-block__cta">Open lab</span>
      </RouterLink>
    </section>

    <section class="home-gallery-link surface-panel">
      <div>
        <p class="section-label">Current placeholders</p>
        <p class="home-gallery-link__title">{{ aestheticEntries[0].title }} and other future directions.</p>
      </div>
      <RouterLink to="/esteticas/example" class="text-link">View the template detail</RouterLink>
    </section>

    <section class="closing-block">
      <p class="closing-block__title">Have something worth building?</p>
      <RouterLink to="/contacto" class="closing-block__link">Start a conversation</RouterLink>
    </section>
  </div>
</template>