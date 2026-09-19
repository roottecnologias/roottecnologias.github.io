<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import './swiss-system.css';

type Study = {
  number: string;
  title: string;
  description: string;
  meta: string;
  className: string;
};

const studies: Study[] = [
  { number: '01', title: 'FORM', description: 'A study in reduction. One mark establishes the field; everything else is consequence.', meta: 'CIRCLE / AXIS / INTERVAL', className: 'form' },
  { number: '02', title: 'RHYTHM', description: 'Repetition becomes movement when the distance between elements is allowed to change.', meta: 'SEQUENCE / 08 MODULES / 72 PX', className: 'rhythm' },
  { number: '03', title: 'SCALE', description: 'A number is not a caption. It is a surface with weight, direction and proportion.', meta: '04.17 / EXTENT / RELATION', className: 'scale' },
  { number: '04', title: 'CONTRAST', description: 'The quiet field and the decisive mark share the same coordinate system.', meta: 'BLACK / RED / PAPER', className: 'contrast' },
];

const density = ref(6);
const typeScale = ref(56);
const redLines = ref(true);
const crop = ref(50);
const activeStudy = ref(0);

const systemStyle = computed(() => ({
  '--ss-density': density.value,
  '--ss-type-scale': `${typeScale.value}px`,
  '--ss-crop': `${crop.value}%`,
}));

function changeStudy(direction: number) {
  activeStudy.value = (activeStudy.value + direction + studies.length) % studies.length;
}

</script>

<template>
  <div class="swiss-system" :class="{ 'has-red-lines': redLines }" :style="systemStyle">
    <header class="ss-header">
      <RouterLink class="ss-back" to="/esteticas/swiss-system">&#8592; Back to aesthetic</RouterLink>
      <p class="ss-brand">05</p>
    </header>

    <main>
      <section class="ss-opening" aria-labelledby="ss-title">
        <div class="ss-opening__index">01</div>
        <div class="ss-opening__title"><h1 id="ss-title">Swiss<br /><em>System</em></h1><p class="ss-opening__intro">Information becomes the visual object.</p></div>
        <div class="ss-opening__mark" aria-label="Swiss System diagram"><span></span><i></i><b>04</b></div>
        <div class="ss-opening__footer"><span>THE SYSTEM IS THE IMAGE</span><a href="#grid" aria-label="Continue to grid system">&#8595;</a></div>
      </section>

      <section id="grid" class="ss-section ss-grid-section" aria-labelledby="grid-title">
        <div class="ss-grid-intro"><h2 id="grid-title">Every element<br /><em>has a position.</em></h2><p>A four-column field, expanded and compressed according to context. The rules are visible because the content depends on them.</p></div>
        <div class="ss-grid-demo" aria-label="Responsive modular grid demonstration">
          <div v-for="column in density" :key="column" class="ss-grid-column"></div>
          <div class="ss-grid-demo__type">A SYSTEM<br /><strong>OF RELATIONS</strong></div>
          <div class="ss-grid-demo__number">{{ String(density).padStart(2, '0') }}</div>
          <div class="ss-grid-demo__line"></div>
        </div>
      </section>

      <section id="studies" class="ss-section ss-studies" aria-labelledby="studies-title">
        <div class="ss-studies__heading"><h2 id="studies-title">One grid.<br /><em>Four readings.</em></h2><p>Studies in form, rhythm, scale and contrast. The system stays constant; the expression moves.</p></div>
        <div class="ss-study-space" aria-live="polite">
          <div class="ss-study-space__rail"><span v-for="(study, index) in studies" :key="study.number" :class="{ 'is-active': activeStudy === index }">{{ study.number }}</span></div>
          <article class="ss-study" :class="`ss-study--${studies[activeStudy].className}`">
            <div class="ss-study__visual"><span></span><i></i><b>{{ studies[activeStudy].number }}</b></div>
            <div class="ss-study__copy"><p class="ss-kicker">Study {{ studies[activeStudy].number }} / {{ studies[activeStudy].meta }}</p><h3>{{ studies[activeStudy].title }}</h3><p>{{ studies[activeStudy].description }}</p></div>
          </article>
          <div class="ss-study__controls"><button type="button" aria-label="Previous visual study" @click="changeStudy(-1)">&#8592;</button><span>{{ studies[activeStudy].number }} / 04</span><button type="button" aria-label="Next visual study" @click="changeStudy(1)">&#8594;</button></div>
        </div>
      </section>

      <section class="ss-type-image" aria-labelledby="type-image-title">
        <div class="ss-type-image__image" role="img" aria-label="Abstract red, black and paper geometric composition"></div>
        <div class="ss-type-image__type"><h2 id="type-image-title">The edge<br />is <em>content.</em></h2><p>Typography does not sit beside the image. It defines the crop, interrupts the field and gives the eye a route through it.</p></div>
      </section>

      <section class="ss-section ss-proportion" aria-labelledby="proportion-title"><div class="ss-proportion__content"><h2 id="proportion-title"><strong>04</strong><span>columns<br />make a field.</span></h2><div class="ss-proportion__measure"><span>12</span><i></i><span>08</span><small>MODULES / BASELINE</small></div><p>Scale is not decoration. It is the distance between one decision and the next.</p></div></section>

      <section id="variables" class="ss-section ss-variables" aria-labelledby="variables-title"><div class="ss-variables__intro"><h2 id="variables-title">Change<br /><em>the rules.</em></h2><p>Adjust the system and observe how a stable structure produces different expressions.</p></div><div class="ss-controls" aria-label="Visual system controls"><label>Grid density <output>{{ density }} columns</output><input v-model.number="density" type="range" min="4" max="8" step="1" aria-label="Grid density" /></label><label>Type scale <output>{{ typeScale }} pixels</output><input v-model.number="typeScale" type="range" min="42" max="76" step="2" aria-label="Type scale" /></label><label>Image crop <output>{{ crop }} percent</output><input v-model.number="crop" type="range" min="20" max="80" step="5" aria-label="Image crop" /></label><label class="ss-toggle"><input v-model="redLines" type="checkbox" /> <span>Show structural accent lines</span></label></div><div class="ss-variable-sample"><span class="ss-variable-sample__number">{{ String(density).padStart(2, '0') }}</span><p :style="{ fontSize: `${typeScale}px` }">Rules<br /><em>create freedom.</em></p></div></section>

      <section class="ss-closing" aria-labelledby="closing-title"><h2 id="closing-title">Information<br /><em>in motion.</em></h2><p>One system. Many readings. The next composition begins where this one ends.</p><RouterLink to="/esteticas/swiss-system">&#8592; Back to aesthetic</RouterLink></section>
    </main>

    <footer class="ss-footer"><span>SWISS SYSTEM / VISUAL RESEARCH</span><span>01—07 / 2026</span><span>ORDER IS NOT STATIC</span></footer>
  </div>
</template>