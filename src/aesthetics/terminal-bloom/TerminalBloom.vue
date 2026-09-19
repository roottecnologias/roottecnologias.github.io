<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import './terminal-bloom.css';

type Specimen = {
  id: string;
  number: string;
  name: string;
  commonName: string;
  status: string;
  location: string;
  observation: string;
  hue: string;
};

const specimens: Specimen[] = [
  {
    id: 'tb-014',
    number: '014',
    name: 'Lumen ferox',
    commonName: 'The patient light',
    status: 'stable',
    location: 'North glasshouse / 04',
    observation: 'Opens only after the archive lamps have been quiet for seven minutes.',
    hue: 'ochre',
  },
  {
    id: 'tb-027',
    number: '027',
    name: 'Mora circuita',
    commonName: 'Wire moss',
    status: 'observed',
    location: 'Wet bench / sector B',
    observation: 'Fine filaments follow the rhythm of the cooling fans.',
    hue: 'moss',
  },
  {
    id: 'tb-031',
    number: '031',
    name: 'Vespera nodus',
    commonName: 'Night knot',
    status: 'unresolved',
    location: 'Unmapped / low signal',
    observation: 'A folded shape recorded where no root system should be possible.',
    hue: 'rust',
  },
];

const selectedSpecimen = ref(specimens[0]);

function selectSpecimen(specimen: Specimen) {
  selectedSpecimen.value = specimen;
}
</script>

<template>
  <div class="terminal-bloom">
    <header class="tb-header">
      <RouterLink class="tb-return" to="/esteticas/terminal-bloom">&lt;- Back to aesthetic</RouterLink>
      <p class="tb-mark"><span>TB</span> / FIELD ARCHIVE 07</p>
      <a class="tb-header-link" href="#specimens">Index <span aria-hidden="true">&#8595;</span></a>
    </header>

    <main>
      <section class="tb-hero" aria-labelledby="tb-title">
        <div class="tb-hero__meta">
          <p>Archive status: <strong>open</strong></p>
          <p>Coordinates: 51° 28' 40" N / 0° 00' 05" W</p>
          <p>Last transmission: 1987.11.03</p>
        </div>
        <div class="tb-hero__statement">
          <p class="tb-kicker">An experimental botanical index</p>
          <h1 id="tb-title">Life,<br /><em>under observation.</em></h1>
          <p class="tb-hero__intro">Terminal Bloom records what grows between the measured world and the living one.</p>
        </div>
        <div class="tb-hero__stamp" aria-label="Archive stamp">
          <span>TB</span>
          <small>specimen<br />archive</small>
        </div>
      </section>

      <section id="specimens" class="tb-section tb-specimens" aria-labelledby="specimen-title">
        <div class="tb-section-heading">
          <p class="tb-kicker">01 / Collection</p>
          <h2 id="specimen-title">Indexed growth</h2>
          <p>Three observations from a collection still learning its own taxonomy.</p>
        </div>

        <div class="tb-specimen-layout">
          <div class="tb-specimen-list" role="list" aria-label="Specimen index">
            <button
              v-for="specimen in specimens"
              :key="specimen.id"
              class="tb-specimen-row"
              :class="{ 'is-selected': selectedSpecimen.id === specimen.id }"
              type="button"
              :aria-pressed="selectedSpecimen.id === specimen.id"
              @click="selectSpecimen(specimen)"
            >
              <span class="tb-specimen-row__number">{{ specimen.number }}</span>
              <span class="tb-specimen-row__name"><em>{{ specimen.name }}</em><small>{{ specimen.commonName }}</small></span>
              <span class="tb-specimen-row__status">{{ specimen.status }}</span>
              <span class="tb-specimen-row__arrow" aria-hidden="true">&#8594;</span>
            </button>
          </div>

          <article class="tb-specimen-detail" aria-live="polite">
            <div class="tb-detail-topline"><span>Selected specimen</span><span>{{ selectedSpecimen.id }}</span></div>
            <div class="tb-botanical-mark" :class="`tb-botanical-mark--${selectedSpecimen.hue}`" aria-hidden="true">
              <span class="tb-orbit tb-orbit--one"></span>
              <span class="tb-orbit tb-orbit--two"></span>
              <span class="tb-stem"></span>
              <span class="tb-leaf tb-leaf--one"></span>
              <span class="tb-leaf tb-leaf--two"></span>
              <span class="tb-leaf tb-leaf--three"></span>
              <span class="tb-bloom"></span>
            </div>
            <div class="tb-specimen-detail__copy">
              <p class="tb-kicker">Specimen {{ selectedSpecimen.number }}</p>
              <h3>{{ selectedSpecimen.name }}</h3>
              <p>{{ selectedSpecimen.observation }}</p>
              <dl>
                <div><dt>Status</dt><dd>{{ selectedSpecimen.status }}</dd></div>
                <div><dt>Location</dt><dd>{{ selectedSpecimen.location }}</dd></div>
              </dl>
            </div>
          </article>
        </div>
      </section>

      <section class="tb-section tb-research" aria-labelledby="research-title">
        <div class="tb-section-heading">
          <p class="tb-kicker">02 / Instrument readout</p>
          <h2 id="research-title">The living signal</h2>
        </div>
        <div class="tb-readout">
          <div class="tb-readout__label"><span>Environment scan</span><span>RUNNING</span></div>
          <div class="tb-readout__line"><span>MOISTURE</span><strong>68.4%</strong><i style="--value: 68%"></i></div>
          <div class="tb-readout__line"><span>LIGHT / LUX</span><strong>0142</strong><i style="--value: 42%"></i></div>
          <div class="tb-readout__line"><span>SOIL RESISTANCE</span><strong>03.7 Ω</strong><i style="--value: 37%"></i></div>
          <div class="tb-readout__line"><span>GROWTH DELTA</span><strong>+1.82</strong><i style="--value: 82%"></i></div>
          <p class="tb-readout__note">Signal remains within expected irregularity. Continue observation.</p>
        </div>
        <div class="tb-coordinate-note"><span>LAT 51.4778</span><span>LONG 0.0015</span><span>NODE 04-B</span></div>
      </section>

      <section class="tb-statement" aria-label="Archive philosophy">
        <p class="tb-kicker">Field note / 07</p>
        <blockquote>“The machine does not make the flower less strange. It only gives us another way to notice.”</blockquote>
        <p>Every specimen is a negotiation between the thing itself and the system built to describe it.</p>
      </section>
    </main>

    <footer class="tb-footer">
      <p>Terminal Bloom / an imaginary botanical research archive</p>
      <RouterLink to="/esteticas/terminal-bloom">Return to case file <span aria-hidden="true">&#8599;</span></RouterLink>
      <p class="tb-footer__index">End of transmission / 07</p>
    </footer>
  </div>
</template>