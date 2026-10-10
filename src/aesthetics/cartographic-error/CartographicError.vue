<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import './cartographic-error.css';

type LayerKey = 'terrain' | 'elevation' | 'water' | 'roads' | 'settlements' | 'borders' | 'survey' | 'anomalies';
type MapPoint = { x: number; y: number };
type Anomaly = { id: string; name: string; kind: string; detail: string; x: number; y: number; coordinate: string };

const layerNames: { key: LayerKey; label: string }[] = [
  { key: 'terrain', label: 'TERRAIN' }, { key: 'elevation', label: 'ELEVATION' }, { key: 'water', label: 'WATER' }, { key: 'roads', label: 'ROADS' },
  { key: 'settlements', label: 'SETTLEMENTS' }, { key: 'borders', label: 'BORDERS' }, { key: 'survey', label: 'SURVEY' }, { key: 'anomalies', label: 'ANOMALIES' },
];
const anomalies: Anomaly[] = [
  { id: 'AE-01', name: 'THE RETURN ROAD', kind: 'TOPOLOGY', detail: 'A route returns to its own origin after covering 14.8 km. The survey insists it is straight.', x: 340, y: 430, coordinate: '48° 17\' 32" N / 12° 04\' 18" W' },
  { id: 'AE-02', name: 'DUPLICATE NORTH', kind: 'COORDINATE', detail: 'Two survey markers occupy one coordinate. One of them is 312 m above the other.', x: 805, y: 182, coordinate: '48° 19\' 07" N / 12° 01\' 44" W' },
  { id: 'AE-03', name: 'LAKE ABSENT', kind: 'HISTORICAL', detail: 'The 1964 plate records a lake here. The shoreline remains in the current survey, but the water does not.', x: 710, y: 520, coordinate: '48° 14\' 51" N / 12° 02\' 02" W' },
  { id: 'AE-04', name: 'OVERLAP LINE', kind: 'BOUNDARY', detail: 'The west and east limits share a segment without agreeing on the territory between them.', x: 962, y: 352, coordinate: '48° 16\' 40" N / 11° 59\' 33" W' },
];

const layers = ref<Record<LayerKey, boolean>>({ terrain: true, elevation: true, water: true, roads: true, settlements: true, borders: true, survey: true, anomalies: true });
const interactionMode = ref<'inspect' | 'measure' | 'route' | 'pan'>('inspect');
const zoom = ref(1);
const pan = ref({ x: 0, y: 0 });
const selectedCoordinate = ref<MapPoint>({ x: 540, y: 330 });
const selectedAnomaly = ref<Anomaly | null>(null);
const measurement = ref<MapPoint[]>([]);
const routePoints = ref<MapPoint[]>([]);
const historical = ref(false);
const pointerStart = ref<MapPoint | null>(null);
const pointerLast = ref<MapPoint | null>(null);
const hasDragged = ref(false);
const reducedMotion = ref(false);
const mapSvg = ref<SVGSVGElement | null>(null);
let animationFrame = 0;

const mapTransform = computed(() => `translate(${pan.value.x} ${pan.value.y}) scale(${zoom.value})`);
const currentElevation = computed(() => Math.round(420 + Math.sin(selectedCoordinate.value.x * .012) * 210 + Math.cos(selectedCoordinate.value.y * .014) * 150));
const coordinateText = computed(() => {
  const latitude = 48 + (760 - selectedCoordinate.value.y) / 1200;
  const longitude = -12 + (selectedCoordinate.value.x - 600) / 1000;
  return `${Math.abs(latitude).toFixed(4)}° N / ${Math.abs(longitude).toFixed(4)}° W`;
});
const measurementDistance = computed(() => {
  if (measurement.value.length < 2) return '—';
  const [start, end] = measurement.value;
  return `${(Math.hypot(end.x - start.x, end.y - start.y) * .018).toFixed(1)} KM`;
});
const measurementBearing = computed(() => {
  if (measurement.value.length < 2) return '—';
  const [start, end] = measurement.value;
  return `${String(Math.round((Math.atan2(end.x - start.x, start.y - end.y) * 180 / Math.PI + 360) % 360)).padStart(3, '0')}°`;
});
const routeDistance = computed(() => routePoints.value.reduce((total, point, index) => index ? total + Math.hypot(point.x - routePoints.value[index - 1].x, point.y - routePoints.value[index - 1].y) : 0, 0) * .018);
const routePath = computed(() => routePoints.value.map((point) => `${point.x},${point.y}`).join(' '));

function mapPointFromEvent(event: PointerEvent): MapPoint {
  const rect = mapSvg.value?.getBoundingClientRect();
  if (!rect) return { x: 0, y: 0 };
  const rawX = (event.clientX - rect.left) / rect.width * 1200;
  const rawY = (event.clientY - rect.top) / rect.height * 760;
  return { x: Math.max(0, Math.min(1200, (rawX - pan.value.x) / zoom.value)), y: Math.max(0, Math.min(760, (rawY - pan.value.y) / zoom.value)) };
}

function inspect(point: MapPoint) { selectedCoordinate.value = point; selectedAnomaly.value = null; }
function mapPointerDown(event: PointerEvent) {
  pointerStart.value = mapPointFromEvent(event);
  pointerLast.value = { x: event.clientX, y: event.clientY };
  hasDragged.value = false;
  mapSvg.value?.setPointerCapture(event.pointerId);
}
function mapPointerMove(event: PointerEvent) {
  if (!pointerLast.value || interactionMode.value !== 'pan') return;
  const dx = event.clientX - pointerLast.value.x;
  const dy = event.clientY - pointerLast.value.y;
  if (Math.abs(dx) + Math.abs(dy) > 2) hasDragged.value = true;
  pan.value = { x: pan.value.x + dx, y: pan.value.y + dy };
  pointerLast.value = { x: event.clientX, y: event.clientY };
}
function mapPointerUp(event: PointerEvent) {
  if (pointerStart.value && !hasDragged.value && interactionMode.value !== 'pan') {
    if (interactionMode.value === 'measure') measurement.value = measurement.value.length === 2 ? [pointerStart.value] : [...measurement.value, pointerStart.value];
    else if (interactionMode.value === 'route') routePoints.value = [...routePoints.value, pointerStart.value];
    else inspect(pointerStart.value);
  }
  pointerStart.value = null; pointerLast.value = null;
  mapSvg.value?.releasePointerCapture(event.pointerId);
}
function zoomMap(amount: number) { zoom.value = Math.max(.72, Math.min(2.2, Number((zoom.value + amount).toFixed(2)))); }
function toggleLayer(key: LayerKey) { layers.value[key] = !layers.value[key]; }
function focusAnomaly(anomaly: Anomaly) {
  selectedAnomaly.value = anomaly;
  selectedCoordinate.value = { x: anomaly.x, y: anomaly.y };
  pan.value = { x: 600 - anomaly.x * zoom.value, y: 380 - anomaly.y * zoom.value };
}
function clearMeasurement() { measurement.value = []; }
function clearRoute() { routePoints.value = []; }
function resetView() { zoom.value = 1; pan.value = { x: 0, y: 0 }; selectedAnomaly.value = null; }
function handleKeydown(event: KeyboardEvent) {
  if (event.key === '+' || event.key === '=') zoomMap(.1);
  if (event.key === '-') zoomMap(-.1);
  if (event.key === 'Escape') { interactionMode.value = 'inspect'; clearMeasurement(); clearRoute(); }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('keydown', handleKeydown);
  animationFrame = window.requestAnimationFrame(() => undefined);
});
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown); window.cancelAnimationFrame(animationFrame); });
</script>

<template>
  <div class="cartographic-error">
    <header class="ce-header"><RouterLink to="/esteticas/cartographic-error" class="ce-back">← BACK TO AESTHETIC</RouterLink><div class="ce-titlemark"><strong>CE / 04</strong><span>INSTITUTE OF IMPOSSIBLE SURVEYS</span></div><div class="ce-header-readout"><span>PLATE 7A</span><span>REV. 1964 / 2026</span></div></header>
    <main class="ce-instrument">
      <section class="ce-map-stage" aria-labelledby="ce-map-title">
        <div class="ce-map-heading"><p>FIELD SURVEY / NORTHWEST ANNEX</p><h1 id="ce-map-title">Cartographic Error</h1><span>THE GEOGRAPHY IS NOT TO SCALE</span></div>
        <svg ref="mapSvg" class="ce-map" viewBox="0 0 1200 760" role="img" aria-labelledby="map-svg-title map-svg-description" :style="{ cursor: interactionMode === 'pan' ? 'grab' : 'crosshair' }" @pointerdown="mapPointerDown" @pointermove="mapPointerMove" @pointerup="mapPointerUp" @pointercancel="mapPointerUp" @wheel.prevent="zoomMap($event.deltaY > 0 ? -.1 : .1)">
          <title id="map-svg-title">Survey map of the impossible Varra basin</title><desc id="map-svg-description">A fictional topographic map with water, contour lines, roads, settlements, borders, survey markers and anomalies.</desc>
          <g :transform="mapTransform">
            <rect width="1200" height="760" class="ce-map-paper" />
            <g class="ce-grid"><path d="M0 95H1200M0 190H1200M0 285H1200M0 380H1200M0 475H1200M0 570H1200M0 665H1200M120 0V760M240 0V760M360 0V760M480 0V760M600 0V760M720 0V760M840 0V760M960 0V760M1080 0V760" /><text x="36" y="34">48°20'N</text><text x="1080" y="34">12°00'W</text><text x="36" y="744">48°12'N</text><text x="1070" y="744">12°08'W</text></g>
            <g v-if="layers.terrain" class="ce-terrain"><path d="M0 0H440C410 92 470 140 390 212C300 292 330 346 222 396C142 434 124 520 0 548Z" /><path d="M1200 0H840C890 80 812 158 882 228C954 300 896 382 1018 432C1084 460 1102 540 1200 560Z" /><path d="M0 760V622C146 572 232 620 302 584C382 544 438 574 502 760Z" /><path d="M1200 760V600C1082 572 1008 626 934 594C852 560 802 626 742 760Z" /></g>
            <g v-if="layers.water" class="ce-water"><path d="M468 0C520 72 496 135 540 191C578 240 552 282 590 330C630 382 578 440 612 506C646 572 608 654 638 760H478C500 688 448 610 472 544C496 476 450 416 480 354C508 296 458 238 486 182C514 124 462 68 468 0Z" /><path class="ce-water-line" d="M492 38C535 94 516 152 552 207M510 245C548 300 523 352 562 410M520 468C562 524 538 595 582 676" /></g>
            <g v-if="layers.elevation" class="ce-contours"><path d="M90 88C210 30 346 80 374 170C404 267 318 306 236 294C132 278 54 212 90 88Z" /><path d="M130 116C226 70 318 105 337 176C358 247 291 275 227 264C146 250 101 201 130 116Z" /><path d="M164 144C232 112 291 136 305 184C319 234 272 248 224 239C169 228 143 187 164 144Z" /><path d="M742 82C846 28 1018 72 1082 184C1138 282 1072 360 956 336C842 313 720 226 742 82Z" /><path d="M780 116C866 70 986 104 1038 188C1080 254 1020 309 956 294C862 272 758 206 780 116Z" /><path d="M818 151C878 118 957 137 992 190C1018 230 986 270 944 255C884 234 804 204 818 151Z" /><path d="M82 590C184 522 320 540 374 620C412 678 350 720 264 706C158 690 32 654 82 590Z" /><path d="M820 576C908 526 1044 548 1114 632C1148 674 1084 722 992 708C900 694 776 642 820 576Z" /><path class="ce-contour-impossible" d="M262 384C338 308 430 342 414 424C398 508 290 496 306 412C320 334 432 370 452 444C468 506 376 544 306 492" /></g>
            <g v-if="layers.borders" class="ce-borders"><path d="M62 268C214 244 314 314 434 286C542 260 626 282 738 246C858 208 956 226 1146 184" /><path d="M42 502C166 462 292 512 402 486C528 456 638 484 752 456C864 428 1010 460 1154 420" /><path class="ce-border-overlap" d="M926 230C944 302 918 362 956 430C982 478 948 546 972 620" /></g>
            <g v-if="layers.roads" class="ce-roads"><path d="M26 646C160 604 220 528 340 430C420 364 512 396 610 374C730 348 778 238 844 182C912 124 1040 136 1172 82" /><path d="M340 430C420 472 504 516 608 496C716 476 780 524 884 560C1004 602 1086 574 1180 604" /><path d="M340 430C332 392 364 354 414 348C458 342 472 314 484 274" /><path class="ce-road-secondary" d="M608 496C642 444 622 396 610 374M844 182C866 222 910 246 956 250" /></g>
            <g v-if="historical" class="ce-history"><path d="M456 0C504 82 464 156 512 226C548 278 520 348 552 422C582 494 542 586 574 760" /><ellipse cx="710" cy="520" rx="92" ry="54" /><path d="M926 230C958 300 936 370 986 430C1018 478 984 548 1012 620" /></g>
            <g v-if="layers.settlements" class="ce-settlements"><g><circle cx="224" cy="244" r="7" /><circle cx="208" cy="252" r="3" /><circle cx="242" cy="252" r="3" /><text x="186" y="224">VARA</text></g><g><circle cx="882" cy="350" r="7" /><circle cx="866" cy="358" r="3" /><circle cx="900" cy="358" r="3" /><text x="842" y="332">MIREN</text></g><g class="ce-moving-settlement"><circle cx="804" cy="182" r="7" /><text x="826" y="174">OLN</text></g></g>
            <g v-if="layers.survey" class="ce-survey"><g v-for="marker in [{ x: 340, y: 430, id: 'S-14' }, { x: 805, y: 182, id: 'S-22' }, { x: 710, y: 520, id: 'S-31' }, { x: 962, y: 352, id: 'S-40' }]" :key="marker.id"><path :d="`M${marker.x - 8} ${marker.y}H${marker.x + 8}M${marker.x} ${marker.y - 8}V${marker.y + 8}`" /><text :x="marker.x + 12" :y="marker.y - 8">{{ marker.id }}</text></g></g>
            <g v-if="layers.anomalies" class="ce-anomalies"><g v-for="anomaly in anomalies" :key="anomaly.id" class="ce-anomaly" :class="{ 'is-selected': selectedAnomaly?.id === anomaly.id }" tabindex="0" role="button" :aria-label="`${anomaly.id}: ${anomaly.name}`" @click.stop="focusAnomaly(anomaly)" @keydown.enter.stop="focusAnomaly(anomaly)"><circle :cx="anomaly.x" :cy="anomaly.y" r="14" /><path :d="`M${anomaly.x - 5} ${anomaly.y - 5}L${anomaly.x + 5} ${anomaly.y + 5}M${anomaly.x + 5} ${anomaly.y - 5}L${anomaly.x - 5} ${anomaly.y + 5}`" /><text :x="anomaly.x + 20" :y="anomaly.y + 4">{{ anomaly.id }}</text></g></g>
            <polyline v-if="routePoints.length > 1" class="ce-route-line" :points="routePath" /><g v-for="(point, index) in routePoints" :key="`route-${index}`" class="ce-route-point"><circle :cx="point.x" :cy="point.y" r="5" /><text :x="point.x + 9" :y="point.y - 8">{{ index + 1 }}</text></g>
            <line v-if="measurement.length === 2" class="ce-measure-line" :x1="measurement[0].x" :y1="measurement[0].y" :x2="measurement[1].x" :y2="measurement[1].y" /><circle v-for="(point, index) in measurement" :key="`measure-${index}`" class="ce-measure-point" :cx="point.x" :cy="point.y" r="6" />
            <g class="ce-map-labels"><text x="70" y="392" class="ce-label-large">VARA BASIN</text><text x="720" y="112" class="ce-label-large">THE UPPER MIRE</text><text x="102" y="560">NORTH ESCARPMENT</text><text x="870" y="680">SOUTHERN LIMIT</text><text x="570" y="352" class="ce-label-water">RIVER NUL</text><text x="528" y="708" class="ce-label-coordinate">48°14'N</text></g>
          </g>
        </svg>
        <div class="ce-map-scale"><span>0</span><i></i><span>5 KM</span><b>ORTHOGRAPHIC PLATE / 1:42,000</b></div>
        <div class="ce-map-controls" aria-label="Map navigation controls"><button type="button" aria-label="Zoom in" @click="zoomMap(.1)">+</button><button type="button" aria-label="Zoom out" @click="zoomMap(-.1)">−</button><button type="button" aria-label="Reset map view" @click="resetView">⌖</button></div>
      </section>

      <aside class="ce-instrument-rail" aria-label="Cartographic instrument controls">
        <section class="ce-readout"><p class="ce-overline">ACTIVE COORDINATE</p><strong>{{ coordinateText }}</strong><dl><div><dt>ELEVATION</dt><dd>{{ currentElevation }} M</dd></div><div><dt>GRID</dt><dd>Q-17 / 04</dd></div><div><dt>PRECISION</dt><dd>± 3.2 M</dd></div></dl><p class="ce-readout-note">{{ selectedAnomaly ? selectedAnomaly.kind + ' / ' + selectedAnomaly.id : 'Click any point on the plate to inspect' }}</p></section>
        <section class="ce-tools"><p class="ce-overline">FIELD TOOLS</p><div class="ce-mode-list"><button type="button" :class="{ active: interactionMode === 'inspect' }" @click="interactionMode = 'inspect'"><span>01</span> INSPECT COORDINATE</button><button type="button" :class="{ active: interactionMode === 'measure' }" @click="interactionMode = 'measure'"><span>02</span> MEASURE DISTANCE</button><button type="button" :class="{ active: interactionMode === 'route' }" @click="interactionMode = 'route'"><span>03</span> PLOT ROUTE</button><button type="button" :class="{ active: interactionMode === 'pan' }" @click="interactionMode = 'pan'"><span>04</span> PAN PLATE</button></div><div v-if="interactionMode === 'measure'" class="ce-tool-result"><span>DISTANCE / {{ measurementDistance }}</span><span>BEARING / {{ measurementBearing }}</span><button type="button" @click="clearMeasurement">CLEAR MEASURE</button></div><div v-if="interactionMode === 'route'" class="ce-tool-result"><span>{{ routePoints.length }} WAYPOINTS / {{ routeDistance.toFixed(1) }} KM</span><button type="button" @click="clearRoute">CLEAR ROUTE</button></div></section>
        <section class="ce-layers"><p class="ce-overline">PLATE LAYERS</p><div class="ce-layer-list"><button v-for="layer in layerNames" :key="layer.key" type="button" :class="{ active: layers[layer.key] }" :aria-pressed="layers[layer.key]" @click="toggleLayer(layer.key)"><i></i><span>{{ layer.label }}</span><b>{{ layers[layer.key] ? 'ON' : 'OFF' }}</b></button></div><label class="ce-history-toggle"><input v-model="historical" type="checkbox" /> <span>COMPARE 1964 SURVEY</span></label></section>
        <section class="ce-anomaly-index"><div class="ce-index-head"><p class="ce-overline">ANOMALY INDEX</p><span>{{ anomalies.length }} RECORDS</span></div><button v-for="anomaly in anomalies" :key="anomaly.id" type="button" :class="{ active: selectedAnomaly?.id === anomaly.id }" @click="focusAnomaly(anomaly)"><span>{{ anomaly.id }}</span><strong>{{ anomaly.name }}</strong><small>{{ anomaly.kind }}</small></button></section>
        <section v-if="selectedAnomaly" class="ce-anomaly-detail" aria-live="polite"><p class="ce-overline">{{ selectedAnomaly.id }} / FIELD NOTE</p><h2>{{ selectedAnomaly.name }}</h2><p>{{ selectedAnomaly.detail }}</p><code>{{ selectedAnomaly.coordinate }}</code></section>
      </aside>
    </main>
    <footer class="ce-footer"><span>CE / VARA BASIN / SHEET 07</span><span>INSTRUMENT STATUS / {{ interactionMode.toUpperCase() }}</span><span>UNRESOLVED GEOGRAPHY</span></footer>
  </div>
</template>