<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import './signal-garden.css';

type Capture = { id: string; seed: number; frequency: number; entropy: number; created: string; image: string };

const fieldCanvas = ref<HTMLCanvasElement | null>(null);
const monitorCanvas = ref<HTMLCanvasElement | null>(null);
const frequency = ref(2.4);
const entropy = ref(38);
const chroma = ref(68);
const pointer = ref({ x: 0.5, y: 0.5, active: false });
const frame = ref(0);
const captures = ref<Capture[]>([]);
const reducedMotion = ref(false);
let animationFrame = 0;
let resizeObserver: ResizeObserver | undefined;

const stateLabel = computed(() => pointer.value.active ? 'RESPONDING' : 'GENERATING');
const signalValue = computed(() => (Math.sin(frame.value * 0.04) * 0.5 + 0.5) * frequency.value * 10);

function getContext(canvas: HTMLCanvasElement | null) {
  return canvas?.getContext('2d');
}

function resizeCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  const context = getContext(canvas);
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawField(time: number) {
  const canvas = fieldCanvas.value;
  const context = getContext(canvas);
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.fillStyle = 'rgba(7, 13, 20, 0.18)';
  context.fillRect(0, 0, width, height);
  const lines = Math.min(34, 14 + Math.floor(entropy.value / 3));
  const interactionX = pointer.value.x * width;
  const interactionY = pointer.value.y * height;
  for (let line = 0; line < lines; line += 1) {
    const baseY = (line / lines) * height;
    context.beginPath();
    for (let step = 0; step <= 90; step += 1) {
      const x = (step / 90) * width;
      const wave = Math.sin(step * 0.16 * frequency.value + line * 0.42 + time * 0.00055) * (8 + entropy.value * 0.18);
      const distance = Math.hypot(x - interactionX, baseY - interactionY);
      const pull = pointer.value.active ? Math.max(0, 1 - distance / (width * 0.55)) * 48 : 0;
      const y = baseY + wave + Math.sin(line * 2.3 + step * 0.08) * entropy.value * 0.09 - pull * (interactionY > baseY ? -0.35 : 0.35);
      if (step === 0) context.moveTo(x, y); else context.lineTo(x, y);
    }
    const hue = line % 7 === 0 ? 25 + chroma.value * 0.18 : line % 5 === 0 ? 250 + chroma.value * 0.5 : 160 + chroma.value * 0.38;
    context.strokeStyle = `hsla(${hue}, 88%, ${line % 7 === 0 ? 62 : 62}%, ${0.15 + (line / lines) * 0.5})`;
    context.lineWidth = line % 8 === 0 ? 1.8 : 0.65;
    context.stroke();
  }
  context.fillStyle = 'rgba(177, 255, 92, 0.8)';
  for (let particle = 0; particle < Math.min(90, 28 + entropy.value); particle += 1) {
    const x = ((particle * 83 + time * (0.008 + frequency.value * 0.001)) % width + width) % width;
    const y = (height * (0.15 + ((particle * 0.071) % 0.72))) + Math.sin(time * 0.001 + particle) * 12;
    context.fillRect(x, y, particle % 9 === 0 ? 2 : 1, particle % 9 === 0 ? 2 : 1);
  }
}

function drawMonitor(time: number) {
  const canvas = monitorCanvas.value;
  const context = getContext(canvas);
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);
  context.strokeStyle = 'rgba(195, 217, 230, 0.12)';
  context.lineWidth = 1;
  for (let index = 1; index < 5; index += 1) { context.beginPath(); context.moveTo(0, (height / 5) * index); context.lineTo(width, (height / 5) * index); context.stroke(); }
  context.beginPath();
  for (let point = 0; point <= 100; point += 1) {
    const x = (point / 100) * width;
    const y = height / 2 + Math.sin(point * 0.25 * frequency.value + time * 0.003) * (height * 0.22) + Math.sin(point * entropy.value * 0.004) * height * 0.08;
    if (point === 0) context.moveTo(x, y); else context.lineTo(x, y);
  }
  context.strokeStyle = '#62e6ff';
  context.lineWidth = 1.6;
  context.stroke();
}

function animate(time: number) {
  frame.value += 1;
  drawField(reducedMotion.value ? 0 : time);
  drawMonitor(reducedMotion.value ? 0 : time);
  if (!reducedMotion.value) animationFrame = requestAnimationFrame(animate);
}

function setPointer(event: PointerEvent) {
  const canvas = fieldCanvas.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  pointer.value = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, active: true };
}

function clearPointer() { pointer.value.active = false; }

function loadCaptures() {
  try { captures.value = JSON.parse(localStorage.getItem('signal-garden-captures') ?? '[]'); } catch { captures.value = []; }
}

function captureSignal() {
  const canvas = fieldCanvas.value;
  if (!canvas) return;
  const capture: Capture = { id: `SG-${Date.now().toString(36).toUpperCase()}`, seed: Math.floor(Math.random() * 999999), frequency: frequency.value, entropy: entropy.value, created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), image: canvas.toDataURL('image/jpeg', 0.72) };
  captures.value = [capture, ...captures.value].slice(0, 4);
  localStorage.setItem('signal-garden-captures', JSON.stringify(captures.value));
}

function clearCaptures() { captures.value = []; localStorage.removeItem('signal-garden-captures'); }

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  loadCaptures();
  resizeCanvas(fieldCanvas.value); resizeCanvas(monitorCanvas.value);
  resizeObserver = new ResizeObserver(() => { resizeCanvas(fieldCanvas.value); resizeCanvas(monitorCanvas.value); });
  if (fieldCanvas.value) resizeObserver.observe(fieldCanvas.value);
  if (monitorCanvas.value) resizeObserver.observe(monitorCanvas.value);
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => { cancelAnimationFrame(animationFrame); resizeObserver?.disconnect(); });
</script>

<template>
  <div class="signal-garden">
    <header class="sg-header"><RouterLink to="/esteticas/signal-garden" class="sg-exit">&#8592; Back to aesthetic</RouterLink><span class="sg-system-mark">SG / FIELD 06</span></header>
    <main>
      <section class="sg-opening" aria-labelledby="sg-title">
        <canvas ref="fieldCanvas" class="sg-field" aria-label="Animated generative signal field"></canvas>
        <div class="sg-opening__statement"><p class="sg-micro">A SYSTEM THAT IS CONTINUOUSLY PRODUCING</p><h1 id="sg-title">Signal<br /><em>Garden</em></h1><p class="sg-opening__lede">Information behaves like a living signal. Influence the field. Observe what emerges.</p></div>
        <div class="sg-opening__readout"><span>STATE</span><strong>{{ stateLabel }}</strong><span>FRAME</span><strong>{{ String(frame).padStart(6, '0') }}</strong><span>FREQ</span><strong>{{ frequency.toFixed(1) }} HZ</strong></div>
        <a class="sg-scroll" href="#live-field" aria-label="Enter the live field">ENTER FIELD &#8595;</a>
      </section>

      <section id="live-field" class="sg-field-section" aria-labelledby="field-title">
        <div class="sg-section-word">FIELD</div><div class="sg-field-section__copy"><p class="sg-micro">01 / LIVE FIELD</p><h2 id="field-title">Touch the signal.</h2><p>Move across the field to bend the current. The system records presence as pressure, distance and drift.</p></div>
        <div class="sg-field-section__hint">POINTER / TOUCH<br />RESPONSE ACTIVE</div>
      </section>

      <section class="sg-monitor-section" aria-labelledby="monitor-title">
        <div><p class="sg-micro">02 / SIGNAL MONITOR</p><h2 id="monitor-title">Amplitude is a weather system.</h2></div>
        <canvas ref="monitorCanvas" class="sg-monitor" aria-label="Live signal waveform monitor"></canvas>
        <div class="sg-monitor__values"><span>AMPLITUDE <b>{{ signalValue.toFixed(2) }}</b></span><span>VELOCITY <b>{{ (frequency * 12.7).toFixed(1) }}</b></span><span>ENTROPY <b>{{ entropy }}%</b></span></div>
      </section>

      <section class="sg-experiment-section" aria-labelledby="experiment-title">
        <div class="sg-experiment-title"><p class="sg-micro">03 / EXPERIMENT</p><h2 id="experiment-title">Change the conditions.</h2></div>
        <div class="sg-controls" aria-label="Signal garden parameters"><label>Frequency <output>{{ frequency.toFixed(1) }} Hz</output><input v-model.number="frequency" type="range" min="0.6" max="5.8" step="0.1" aria-label="Frequency" /></label><label>Entropy <output>{{ entropy }}%</output><input v-model.number="entropy" type="range" min="8" max="90" step="1" aria-label="Entropy" /></label><label>Chromatic pressure <output>{{ chroma }}%</output><input v-model.number="chroma" type="range" min="20" max="100" step="1" aria-label="Chromatic pressure" /></label></div>
        <div class="sg-experiment-note">The field responds to every adjustment. No state is repeated exactly.</div>
      </section>

      <section class="sg-observation" aria-labelledby="observation-title"><p class="sg-micro">04 / OBSERVATION</p><h2 id="observation-title">Measure the emergence.</h2><div class="sg-observation__data"><span>UPTIME <b>{{ (frame / 60).toFixed(1) }} S</b></span><span>PARTICLES <b>{{ 28 + entropy }}</b></span><span>SEED <b>{{ String(Math.round(frequency * 1731 + entropy * 41)).padStart(5, '0') }}</b></span><span>FIELD PRESSURE <b>{{ pointer.active ? 'HIGH' : 'LOW' }}</b></span></div></section>

      <section class="sg-capture" aria-labelledby="capture-title"><div><p class="sg-micro">05 / CAPTURE</p><h2 id="capture-title">Keep a state.</h2><p>Capture the current field and return to it later. Stored locally in this instrument.</p><button type="button" class="sg-capture__button" @click="captureSignal">CAPTURE SIGNAL &#8599;</button><button v-if="captures.length" type="button" class="sg-clear" @click="clearCaptures">CLEAR {{ captures.length }} CAPTURES</button></div><div class="sg-capture__gallery" aria-live="polite"><figure v-for="capture in captures" :key="capture.id"><img :src="capture.image" :alt="`Captured signal ${capture.id}`" /><figcaption>{{ capture.id }} / {{ capture.created }}</figcaption></figure><p v-if="!captures.length" class="sg-empty">NO CAPTURES / FIELD IS EPHEMERAL</p></div></section>

      <section class="sg-system-section" aria-labelledby="system-title"><p class="sg-micro">06 / SYSTEM</p><h2 id="system-title">Signal is not an answer.<br /><em>It is a condition.</em></h2><p>Observe. Influence. Record. The garden is built to make emergence visible, then let it go.</p></section>
    </main>
    <footer class="sg-footer"><span>SIGNAL GARDEN / SYSTEM IDLE</span><RouterLink to="/esteticas/signal-garden">&#8592; Back to aesthetic</RouterLink><span>FIELD CLOSED</span></footer>
  </div>
</template>