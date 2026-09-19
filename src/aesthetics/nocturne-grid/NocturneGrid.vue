<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import './nocturne-grid.css';

type Point = {
  id: string;
  label: string;
  title: string;
  detail: string;
  x: number;
  y: number;
};

type Study = {
  number: string;
  category: string;
  name: string;
  location: string;
  dimensions: string;
  status: string;
  description: string;
  className: string;
  measure: string;
};

const points: Point[] = [
  { id: 'A1', label: 'THRESHOLD', title: 'The arrival cut', detail: 'A narrow opening where exterior light is reduced to a measured line.', x: 18, y: 30 },
  { id: 'B4', label: 'VOID', title: 'Unoccupied volume', detail: 'A room held empty so the rest of the structure can be understood.', x: 56, y: 24 },
  { id: 'C2', label: 'CROSSING', title: 'The lateral bridge', detail: 'A suspended route joining two incompatible elevations.', x: 73, y: 67 },
  { id: 'D7', label: 'OBSERVATION', title: 'Night room', detail: 'The highest point. Movement becomes a distant trace below.', x: 33, y: 76 },
];

const studies: Study[] = [
  { number: '01', category: 'VERTICAL EXTENT', name: 'North Array', location: 'Harbor edge / 2026', dimensions: '84.2 m high / sealed concrete', status: 'OCCUPIED', description: 'A vertical field of rooms calibrated to the last remaining line of horizon.', className: 'tower', measure: '84.2' },
  { number: '02', category: 'LATERAL ROOM', name: 'Low Crossing', location: 'East service field / 2024', dimensions: '16 m span / 09 m clearance', status: 'IN TRANSIT', description: 'A suspended route that makes distance feel briefly weightless.', className: 'bridge', measure: '16—09' },
  { number: '03', category: 'NEGATIVE VOLUME', name: 'Silent Court', location: 'Below grade / 2025', dimensions: 'No fixed program / open to weather', status: 'UNRESOLVED', description: 'A room defined by what was removed, waiting for a use that has not arrived.', className: 'void', measure: '00' },
  { number: '04', category: 'OBSERVATION LINE', name: 'West Relay', location: 'Outer ring / 2023', dimensions: '312 m perimeter / steel and dust', status: 'RECORDED', description: 'A long instrument for seeing the structure from outside its own limits.', className: 'line', measure: '312' },
];

const activePoint = ref(points[0]);
const activeStudyIndex = ref(0);
const scrollProgress = ref(0);
const activeStudy = computed(() => studies[activeStudyIndex.value]);

const coordinate = computed(() => {
  const x = String(Math.round(17 + scrollProgress.value * 68)).padStart(2, '0');
  const y = String(Math.round(4 + scrollProgress.value * 31)).padStart(2, '0');
  return `${x}.${y}`;
});

function selectPoint(point: Point) {
  activePoint.value = point;
}

function moveStudy(direction: number) {
  activeStudyIndex.value = (activeStudyIndex.value + direction + studies.length) % studies.length;
}

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
}

onMounted(() => window.addEventListener('scroll', updateScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', updateScroll));
</script>

<template>
  <div class="nocturne-grid">
    <div class="ng-axis" aria-hidden="true"><span>00</span><i></i><span>31</span></div>

    <header class="ng-header">
      <RouterLink class="ng-return" to="/esteticas/nocturne-grid">&#8592; Back to aesthetic</RouterLink>
      <p class="ng-wordmark"><span>NG / 07</span> Nocturne Grid</p>
      <a class="ng-jump" href="#plan"><span>Navigate</span> 02 <b>&#8595;</b></a>
    </header>

    <main>
      <section class="ng-threshold" aria-labelledby="ng-title">
        <div class="ng-threshold__meta">
          <p>PROJECT 07 / NIGHT STRUCTURE</p>
          <p>FIELD 04 / OBSERVATION DECK</p>
          <p>POSITION <strong>{{ coordinate }}</strong></p>
        </div>
        <div class="ng-threshold__title">
          <p class="ng-label">A constructed interface</p>
          <h1 id="ng-title">Nocturne<br /><span>Grid</span></h1>
          <p class="ng-threshold__lede">A digital building for structures that reveal themselves one plane at a time.</p>
        </div>
        <div class="ng-threshold__figure" aria-label="Abstract elevation drawing">
          <span class="ng-figure__frame"></span><span class="ng-figure__plane ng-figure__plane--one"></span><span class="ng-figure__plane ng-figure__plane--two"></span><span class="ng-figure__beam"></span><span class="ng-figure__point"></span>
          <small>ENTRY / ELEVATION 04</small>
        </div>
        <div class="ng-threshold__prompt"><span>01</span><span>Enter the structure</span><a href="#plan" aria-label="Enter the structure and view the spatial plan">&#8595;</a></div>
      </section>

      <section id="plan" class="ng-section ng-plan" aria-labelledby="plan-title">
        <div class="ng-section-head"><p class="ng-label">02 / Spatial plan</p><h2 id="plan-title">A room is a line<br /><em>until someone crosses it.</em></h2><p class="ng-section-head__copy">Plan N-04 records the building as a sequence of thresholds, pauses, and departures.</p></div>
        <div class="ng-plan__drawing">
          <div class="ng-plan__coordinates"><span>Y 04.17</span><span>X 09.28</span><span>1:240</span></div>
          <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="plan-svg-title plan-svg-desc">
            <title id="plan-svg-title">Plan N-04 architectural map</title><desc id="plan-svg-desc">A dark architectural plan with four connected rooms and four interactive observation points.</desc>
            <path class="ng-plan-line" d="M70 110H310V55H690V170H900V450H620V510H190V390H70Z M310 110V390H620V170 M190 250H310 M620 300H900 M460 55V170 M620 390V510" />
            <path class="ng-plan-line ng-plan-line--fine" d="M70 82H310 M690 82H930 M160 450H160 M850 170V110 M390 510V535 M745 450V520" />
            <path class="ng-plan-route" d="M115 350L270 350L350 200L510 200L665 360L830 360" />
            <circle v-for="point in points" :key="point.id" class="ng-plan-point" :class="{ 'is-active': activePoint.id === point.id }" :cx="point.x * 10" :cy="point.y * 5.2" r="9" tabindex="0" role="button" :aria-label="`${point.id}: ${point.title}`" @click="selectPoint(point)" @keydown.enter="selectPoint(point)" @keydown.space.prevent="selectPoint(point)" />
          </svg>
          <div class="ng-plan__legend"><span>STRUCTURAL WALL</span><span class="ng-legend-route">VISITOR ROUTE</span><span>OBSERVATION POINT</span></div>
        </div>
        <article class="ng-plan__readout" aria-live="polite"><p class="ng-label">Point {{ activePoint.id }} / {{ activePoint.label }}</p><h3>{{ activePoint.title }}</h3><p>{{ activePoint.detail }}</p><span class="ng-readout-rule"></span><small>ACCESS VECTOR / {{ activePoint.x }}.{{ activePoint.y }}</small></article>
      </section>

      <section class="ng-section ng-structures" aria-labelledby="structures-title">
        <div class="ng-section-head ng-section-head--structures"><p class="ng-label">03 / Structures</p><h2 id="structures-title">Four studies<br />in occupation.</h2><p class="ng-section-head__copy">Different volumes, one underlying grid. Each structure is a proposition about how a body moves through the dark.</p></div>
        <div class="ng-study-stage" aria-live="polite">
          <div class="ng-study-stage__rail" aria-label="Architectural study navigation">
            <button
              v-for="(study, index) in studies"
              :key="study.number"
              type="button"
              :class="{ 'is-active': activeStudy.number === study.number }"
              :aria-label="`Go to study ${study.number}: ${study.name}`"
              :aria-current="activeStudy.number === study.number ? 'step' : undefined"
              @click="activeStudyIndex = index"
            >
              {{ study.number }}
            </button>
          </div>
          <article class="ng-study" :class="`ng-study--${activeStudy.className}`">
            <div class="ng-study__visual"><span></span><i></i><b>{{ activeStudy.measure }}</b></div>
            <div class="ng-study__data"><p>PROJECT {{ activeStudy.number }} / {{ activeStudy.category }}</p><h3>{{ activeStudy.name }}</h3><p>{{ activeStudy.location }}<br />{{ activeStudy.dimensions }}</p><p class="ng-study__description">{{ activeStudy.description }}</p><span>STATUS / {{ activeStudy.status }}</span></div>
          </article>
          <div class="ng-study-stage__controls">
            <button type="button" aria-label="Previous architectural study" @click="moveStudy(-1)">&#8592;</button>
            <span>{{ activeStudy.number }} / 04</span>
            <button type="button" aria-label="Next architectural study" @click="moveStudy(1)">&#8594;</button>
          </div>
        </div>
      </section>

      <section class="ng-feature" aria-labelledby="feature-title">
        <div class="ng-feature__tag"><span>04</span><p>Featured structure</p><small>N-04 / ELEVATION NIGHT</small></div>
        <div class="ng-feature__volume" aria-label="Featured structure elevation"><div class="ng-volume__back"></div><div class="ng-volume__front"><span></span><span></span><span></span><span></span></div><div class="ng-volume__roof"></div><i class="ng-volume__light"></i><b>84.2 M</b></div>
        <div class="ng-feature__copy"><p class="ng-label">The Meridian House</p><h2 id="feature-title">A building that keeps<br /><em>one room unlit.</em></h2><p>Its central void is not a defect. It is the instrument through which the rest of the structure becomes legible.</p><a href="#measurements">Inspect elevation &#8594;</a></div>
      </section>

      <section id="measurements" class="ng-section ng-measurements" aria-labelledby="measurements-title"><div class="ng-section-head"><p class="ng-label">05 / Measurements</p><h2 id="measurements-title">The structure<br />in numbers.</h2></div><div class="ng-measurement-field"><div class="ng-measurement ng-measurement--large"><strong>84.2</strong><span>VERTICAL EXTENT / M</span></div><div class="ng-measurement"><strong>1,640</strong><span>OCCUPIED AREA / M²</span></div><div class="ng-measurement"><strong>07°</strong><span>PRIMARY ORIENTATION</span></div><div class="ng-measurement ng-measurement--wide"><strong>18.06.26 / 23:41</strong><span>LAST OBSERVATION / LOCAL TIME</span></div><div class="ng-measurement__line"></div></div></section>

      <section class="ng-human" aria-labelledby="human-title"><p class="ng-label">06 / Human scale</p><div><h2 id="human-title">The distance between<br />two walls is measured<br /><em>by a body.</em></h2><p>A structure becomes a place when someone slows down inside it. The grid does not prescribe a route. It gives the act of moving a visible edge.</p></div><span class="ng-human__mark">1.72 M<br /><small>AVERAGE EYE LINE</small></span></section>
    </main>

    <footer class="ng-footer"><p>NOCTURNE GRID / PROJECT 07</p><RouterLink to="/esteticas/nocturne-grid">&#8592; Back to aesthetic</RouterLink><p>END / 06:42</p></footer>
  </div>
</template>