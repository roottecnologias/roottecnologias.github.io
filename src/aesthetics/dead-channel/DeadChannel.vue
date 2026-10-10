<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import './dead-channel.css';

type Channel = { number: string; name: string; title: string; copy: string; tone: string; source: string };
type Capture = { id: string; channel: string; title: string; time: string; frequency: number; interference: number; image: string };

const channels: Channel[] = [
  { number: '01', name: 'ARCHIVE', title: 'THE WEATHER WAS INSIDE', copy: 'A recovered domestic forecast with no recorded location.', tone: '#d4c6a1', source: 'LOCAL / WEATHER BAND' },
  { number: '02', name: 'SIGNAL', title: 'THE CARRIER REMEMBERS', copy: 'A narrow-band transmission repeating beneath the noise.', tone: '#a8cbd0', source: 'UHF / UNKNOWN ORIGIN' },
  { number: '03', name: 'FIELD', title: 'A DISTANT ROOM', copy: 'The camera is pointed at a room that may no longer exist.', tone: '#c7b7a5', source: 'FIELD UNIT 03' },
  { number: '04', name: 'UNKNOWN', title: 'DO NOT ADJUST', copy: 'The picture is present. The station is not identified.', tone: '#c9b1a4', source: 'SOURCE LOST' },
];

const channelIndex = ref(0);
const frequency = ref(52);
const interference = ref(18);
const brightness = ref(58);
const phase = ref<'tune' | 'acquire' | 'broadcast' | 'interrupt' | 'archive' | 'end'>('tune');
const frame = ref(4831);
const captures = ref<Capture[]>([]);
const selectedCapture = ref<Capture | null>(null);
const waveformCanvas = ref<HTMLCanvasElement | null>(null);
const monitorCanvas = ref<HTMLCanvasElement | null>(null);
const receiver = ref<HTMLElement | null>(null);
const reducedMotion = ref(false);
const signalStrength = computed(() => Math.max(8, Math.round(94 - interference.value * 0.62)));
const channel = computed(() => channels[channelIndex.value]);
const status = computed(() => phase.value === 'interrupt' ? 'NO CARRIER' : phase.value === 'end' ? 'CARRIER LOST' : phase.value === 'tune' ? 'STANDBY' : phase.value === 'acquire' ? 'ACQUIRING' : 'TRANSMISSION ACTIVE');
let animationFrame = 0;
let resizeObserver: ResizeObserver | undefined;
let phaseTimer: number | undefined;

function resizeCanvas(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawSignal(time: number) {
  const canvas = waveformCanvas.value;
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);
  context.strokeStyle = 'rgba(217, 224, 215, .09)';
  context.lineWidth = 1;
  for (let line = 1; line < 5; line += 1) { context.beginPath(); context.moveTo(0, height * line / 5); context.lineTo(width, height * line / 5); context.stroke(); }
  context.beginPath();
  for (let point = 0; point <= 140; point += 1) {
    const x = point / 140 * width;
    const carrier = Math.sin(point * frequency.value * 0.035 + time * 0.0024) * (height * 0.16);
    const noise = Math.sin(point * 1.83 + time * 0.004) * interference.value * 0.11;
    const y = height / 2 + carrier + noise;
    if (point === 0) context.moveTo(x, y); else context.lineTo(x, y);
  }
  context.strokeStyle = channel.value.tone;
  context.globalAlpha = phase.value === 'interrupt' ? .32 : .9;
  context.lineWidth = 1.5;
  context.stroke();
  context.globalAlpha = 1;
}

function drawMonitor(time: number) {
  const canvas = monitorCanvas.value;
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);
  const bars = 32;
  for (let index = 0; index < bars; index += 1) {
    const energy = 8 + Math.abs(Math.sin(index * .7 + time * .001 + frequency.value * .05)) * (height * .65) * (1 - interference.value / 180);
    context.fillStyle = index % 5 === 0 ? '#bc584c' : channel.value.tone;
    context.globalAlpha = .28 + (index / bars) * .5;
    context.fillRect(index * width / bars + 1, height - energy, Math.max(2, width / bars - 3), energy);
  }
  context.globalAlpha = 1;
}

function animate(time: number) {
  frame.value += 1;
  drawSignal(reducedMotion.value ? 0 : time);
  drawMonitor(reducedMotion.value ? 0 : time);
  if (!reducedMotion.value) animationFrame = requestAnimationFrame(animate);
}

function acquire() {
  phase.value = 'acquire';
  window.clearTimeout(phaseTimer);
  phaseTimer = window.setTimeout(() => { phase.value = 'broadcast'; }, reducedMotion.value ? 80 : 1500);
}

function switchChannel(index: number) {
  if (index === channelIndex.value && phase.value === 'broadcast') return;
  channelIndex.value = index;
  phase.value = 'interrupt';
  window.clearTimeout(phaseTimer);
  phaseTimer = window.setTimeout(() => { phase.value = 'broadcast'; }, reducedMotion.value ? 80 : 900);
}

function interrupt() {
  phase.value = 'interrupt';
  window.clearTimeout(phaseTimer);
  phaseTimer = window.setTimeout(() => { phase.value = 'archive'; }, reducedMotion.value ? 80 : 1800);
}

function drawCaptureFrame() {
  const canvas = document.createElement('canvas');
  const width = Math.max(720, receiver.value?.clientWidth ?? 720);
  const height = Math.max(480, receiver.value?.clientHeight ?? 480);
  const context = canvas.getContext('2d');
  if (!context) return '';
  canvas.width = width;
  canvas.height = height;
  const scale = width / 720;
  context.scale(scale, scale);
  const captureWidth = width / scale;
  const captureHeight = height / scale;
  const background = context.createLinearGradient(0, 0, captureWidth, captureHeight);
  background.addColorStop(0, '#69766a');
  background.addColorStop(.27, '#303b39');
  background.addColorStop(.53, '#8c8270');
  background.addColorStop(1, '#202526');
  context.fillStyle = background;
  context.fillRect(0, 0, captureWidth, captureHeight);
  context.globalAlpha = brightness.value / 100;
  context.fillStyle = 'rgba(204, 197, 164, .5)';
  context.transform(1, 0, -.16, 1, captureWidth * .04, 0);
  context.beginPath();
  context.ellipse(captureWidth * .3, captureHeight * .58, captureWidth * .12, captureHeight * .34, 0, 0, Math.PI * 2);
  context.fill();
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.globalAlpha = .28;
  for (let line = 0; line < 24; line += 1) {
    context.fillStyle = line % 3 === 0 ? '#d8ddd5' : '#111515';
    context.fillRect(captureWidth * .7, captureHeight * (.12 + line * .025), captureWidth * .21, 2);
  }
  context.globalAlpha = .42;
  context.fillStyle = '#101414';
  context.font = '800 170px Arial';
  context.fillText(channel.value.number, captureWidth * .72, captureHeight * .88);
  context.globalAlpha = .9;
  context.fillStyle = 'rgba(10, 13, 13, .72)';
  context.fillRect(0, captureHeight * .58, captureWidth, captureHeight * .42);
  context.fillStyle = channel.value.tone;
  context.font = '800 42px Arial';
  context.fillText(channel.value.title, 44, captureHeight * .78);
  context.fillStyle = '#d8ddd5';
  context.font = '12px monospace';
  context.fillText(`CHANNEL ${channel.value.number} / ${channel.value.name}`, 44, 30);
  context.fillText(`FRAME ${String(frame.value).padStart(6, '0')} / ${channel.value.source}`, 44, captureHeight - 28);
  context.strokeStyle = channel.value.tone;
  context.lineWidth = 2;
  context.globalAlpha = .75;
  context.beginPath();
  for (let point = 0; point <= 140; point += 1) {
    const x = point / 140 * captureWidth;
    const y = captureHeight * .48 + Math.sin(point * frequency.value * .035) * 30 + Math.sin(point * 1.83) * interference.value * .11;
    if (point === 0) context.moveTo(x, y); else context.lineTo(x, y);
  }
  context.stroke();
  context.globalAlpha = Math.min(.45, interference.value / 170);
  context.fillStyle = '#f0f0e9';
  for (let particle = 0; particle < interference.value * 2; particle += 1) context.fillRect((particle * 83) % captureWidth, (particle * 47) % captureHeight, 1, 1);
  return canvas.toDataURL('image/jpeg', .88);
}

function captureFrame() {
  const image = drawCaptureFrame();
  const capture: Capture = { id: `DC-${String(frame.value).padStart(6, '0')}`, channel: channel.value.number, title: channel.value.title, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), frequency: frequency.value, interference: interference.value, image };
  captures.value = [capture, ...captures.value].slice(0, 8);
  localStorage.setItem('dead-channel-captures-v2', JSON.stringify(captures.value));
  phase.value = 'archive';
}

function endTransmission() { phase.value = 'end'; }

function loadCaptures() {
  localStorage.removeItem('dead-channel-captures');
  try { captures.value = JSON.parse(localStorage.getItem('dead-channel-captures-v2') ?? '[]'); } catch { captures.value = []; }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  loadCaptures();
  resizeCanvas(waveformCanvas.value); resizeCanvas(monitorCanvas.value);
  resizeObserver = new ResizeObserver(() => { resizeCanvas(waveformCanvas.value); resizeCanvas(monitorCanvas.value); });
  if (waveformCanvas.value) resizeObserver.observe(waveformCanvas.value);
  if (monitorCanvas.value) resizeObserver.observe(monitorCanvas.value);
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => { cancelAnimationFrame(animationFrame); resizeObserver?.disconnect(); window.clearTimeout(phaseTimer); });
</script>

<template>
  <div class="dead-channel" :class="`is-${phase}`">
    <header class="dc-header"><RouterLink to="/esteticas/dead-channel" class="dc-back">EXIT RECEIVER / DC-TV</RouterLink><span>DC-TV / RECEIVER 07</span><span aria-live="polite">{{ status }}</span></header>
    <main>
      <section v-if="phase === 'tune' || phase === 'acquire'" class="dc-tuning" aria-labelledby="dc-tune-title">
        <div class="dc-tuning__field"><p class="dc-kicker">INCOMING CARRIER / FREQUENCY SEARCH</p><h1 id="dc-tune-title">DEAD<br /><span>CHANNEL</span></h1><div class="dc-tuning__noise" aria-hidden="true"></div><p class="dc-tuning__message">{{ phase === 'tune' ? 'Turn the dial. There is something beneath the snow.' : 'Signal detected. Synchronizing picture and sound.' }}</p></div>
        <div class="dc-tuning__readout"><span>CH</span><strong>{{ channel.number }}</strong><span>SYNC</span><strong>{{ phase === 'acquire' ? 'LOCKING' : 'WAIT' }}</strong><span>STRENGTH</span><strong>{{ signalStrength }}%</strong></div>
        <button v-if="phase === 'tune'" type="button" class="dc-button dc-button--large" @click="acquire">TUNE SIGNAL <span>↗</span></button><p v-else class="dc-locking">PLEASE STAND BY / CARRIER LOCK {{ signalStrength }}%</p>
      </section>

      <template v-else>
        <section ref="receiver" class="dc-receiver" :style="{ '--dc-brightness': `${brightness}%`, '--dc-interference': interference }" aria-labelledby="dc-broadcast-title">
          <canvas class="dc-static" ref="waveformCanvas" aria-label="Live carrier waveform"></canvas><div class="dc-picture" aria-hidden="true"><div class="dc-picture__shape"></div><div class="dc-picture__bars"></div><div class="dc-picture__ghost">{{ channel.number }}</div></div>
          <div class="dc-receiver__overlay"></div>
          <div class="dc-receiver__mast"><span>CHANNEL {{ channel.number }} / {{ channel.name }}</span><span>LIVE <i></i> / {{ new Date().getFullYear() }}</span></div>
          <div class="dc-receiver__title"><p class="dc-kicker">RECOVERED TRANSMISSION / {{ channel.source }}</p><h1 id="dc-broadcast-title">{{ channel.title }}</h1><p>{{ channel.copy }}</p></div>
          <div class="dc-receiver__frame"><span>FRAME {{ String(frame).padStart(6, '0') }}</span><span>00:{{ String(frame % 60).padStart(2, '0') }}:{{ String(frame % 24).padStart(2, '0') }}</span></div>
          <div v-if="phase === 'interrupt'" class="dc-interruption" role="status"><strong>TRANSMISSION<br />INTERRUPTED</strong><span>NO CARRIER / SOURCE LOST</span></div>
          <div v-if="phase === 'end'" class="dc-interruption dc-interruption--end" role="status"><strong>CHANNEL<br />CLOSED</strong><span>SIGNAL STRENGTH: 08% / CARRIER LOST</span></div>
        </section>

        <section class="dc-console" aria-label="Receiver controls">
          <div class="dc-channel-bank"><p class="dc-kicker">TUNER / SELECT CHANNEL</p><div class="dc-channel-list"><button v-for="(item, index) in channels" :key="item.number" type="button" :class="{ active: index === channelIndex }" :aria-pressed="index === channelIndex" @click="switchChannel(index)"><b>CH {{ item.number }}</b><span>{{ item.name }}</span></button></div></div>
          <div class="dc-calibration"><p class="dc-kicker">SIGNAL CALIBRATION</p><label>FREQUENCY <output>{{ frequency }}.0 MHZ</output><input v-model.number="frequency" type="range" min="18" max="96" step="1" /></label><label>INTERFERENCE <output>{{ interference }}%</output><input v-model.number="interference" type="range" min="0" max="82" step="1" /></label><label>BRIGHTNESS <output>{{ brightness }}%</output><input v-model.number="brightness" type="range" min="28" max="90" step="1" /></label></div>
          <div class="dc-console__actions"><button type="button" class="dc-button" @click="captureFrame"><span class="dc-rec-dot"></span> REC / CAPTURE FRAME</button><button type="button" class="dc-button dc-button--quiet" @click="interrupt">FORCE INTERRUPTION</button></div>
        </section>

        <section class="dc-instrument" aria-labelledby="dc-instrument-title"><div><p class="dc-kicker">CARRIER ANALYSIS / LIVE</p><h2 id="dc-instrument-title">The picture is a symptom.</h2><p class="dc-muted">Every adjustment changes the received field. The carrier is not stable enough to be owned.</p></div><canvas ref="monitorCanvas" class="dc-spectrum" aria-label="Live signal spectrum"></canvas><dl class="dc-log"><div><dt>CHANNEL</dt><dd>{{ channel.number }}</dd></div><div><dt>FREQUENCY</dt><dd>{{ frequency }}.0 MHZ</dd></div><div><dt>SIGNAL</dt><dd>{{ signalStrength }}%</dd></div><div><dt>STATUS</dt><dd>{{ status }}</dd></div><div><dt>SOURCE</dt><dd>{{ channel.source }}</dd></div><div><dt>FRAME</dt><dd>{{ String(frame).padStart(6, '0') }}</dd></div></dl></section>

        <section v-if="phase === 'archive' || captures.length" class="dc-archive" aria-labelledby="dc-archive-title"><div class="dc-archive__heading"><p class="dc-kicker">RECOVERED MATERIAL / LOCAL ARCHIVE</p><h2 id="dc-archive-title">Frames that stayed.</h2><button v-if="phase !== 'end'" type="button" class="dc-button dc-button--quiet" @click="endTransmission">END TRANSMISSION</button></div><div class="dc-archive__strip" aria-live="polite"><button v-for="capture in captures" :key="capture.id" type="button" class="dc-frame" :class="{ selected: selectedCapture?.id === capture.id }" @click="selectedCapture = capture"><img :src="capture.image" :alt="`Recovered frame ${capture.id}`" /><span>{{ capture.id }} / CH {{ capture.channel }}</span></button><p v-if="!captures.length" class="dc-muted">NO RECOVERED FRAMES / PRESS REC TO RECORD THE CURRENT CARRIER</p></div><div v-if="selectedCapture" class="dc-replay" role="dialog" aria-label="Recovered frame viewer"><img :src="selectedCapture.image" :alt="`Viewing recovered frame ${selectedCapture.id}`" /><div><p class="dc-kicker">REPLAY / {{ selectedCapture.id }}</p><h3>{{ selectedCapture.title }}</h3><p>Recorded {{ selectedCapture.time }} / {{ selectedCapture.frequency }}.0 MHZ / INTERFERENCE {{ selectedCapture.interference }}%</p><button type="button" class="dc-button dc-button--quiet" @click="selectedCapture = null">CLOSE VIEWER</button></div></div></section>
      </template>
    </main>
    <footer class="dc-footer"><span>{{ phase === 'end' ? 'TRANSMISSION ENDING / CARRIER LOST' : 'DC-TV / EXPERIMENTAL RECEIVER' }}</span><span>LOCAL TIME / {{ new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span><RouterLink v-if="phase === 'end'" to="/esteticas/dead-channel">EXIT RECEIVER / DC-TV</RouterLink></footer>
  </div>
</template>