<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import SectionIntro from '@/components/ui/SectionIntro.vue';
import { labExperiments } from '@/data/studio';
import { useLabStorage } from '@/composables/useLabStorage';

const storage = useLabStorage();
const experiments = computed(() => storage.experiments.value.length ? storage.experiments.value : labExperiments);

const isDemoOpen = ref(false);
const demoTitle = ref('');
const demoSummary = ref('');
const btnPos = ref({ x: 0, y: 0 });
const dragging = ref(false);
const dragMoved = ref(false);
const dragOrigin = ref({ pointerX: 0, pointerY: 0, btnX: 0, btnY: 0 });
const closeButtonSize = 52;
let lastBodyOverflow = '';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function setInitialButtonPosition() {
  const viewportWidth = window.innerWidth;
  btnPos.value = {
    x: clamp(viewportWidth - closeButtonSize - 32, 16, viewportWidth - closeButtonSize - 16),
    y: 32,
  };
}

function openDemo(title: string, summary: string) {
  demoTitle.value = title;
  demoSummary.value = summary;
  setInitialButtonPosition();
  isDemoOpen.value = true;
}

function closeDemo() {
  if (dragMoved.value) {
    return;
  }

  isDemoOpen.value = false;
}

function lockScroll() {
  if (typeof document === 'undefined') {
    return;
  }

  lastBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  if (typeof document === 'undefined') {
    return;
  }

  document.body.style.overflow = lastBodyOverflow;
}

function getPointerPoint(event: MouseEvent | TouchEvent) {
  if ('touches' in event) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

  return { x: event.clientX, y: event.clientY };
}

function startDrag(event: MouseEvent | TouchEvent) {
  const point = getPointerPoint(event);
  dragging.value = true;
  dragMoved.value = false;
  dragOrigin.value = {
    pointerX: point.x,
    pointerY: point.y,
    btnX: btnPos.value.x,
    btnY: btnPos.value.y,
  };

  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', endDrag);
}

function onDragMove(event: MouseEvent | TouchEvent) {
  if (!dragging.value) {
    return;
  }

  if ('touches' in event) {
    event.preventDefault();
  }

  const point = getPointerPoint(event);
  const deltaX = point.x - dragOrigin.value.pointerX;
  const deltaY = point.y - dragOrigin.value.pointerY;

  if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
    dragMoved.value = true;
  }

  const nextX = dragOrigin.value.btnX + deltaX;
  const nextY = dragOrigin.value.btnY + deltaY;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  btnPos.value = {
    x: clamp(nextX, 12, viewportWidth - closeButtonSize - 12),
    y: clamp(nextY, 12, viewportHeight - closeButtonSize - 12),
  };
}

function endDrag() {
  dragging.value = false;
  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchmove', onDragMove);
  window.removeEventListener('touchend', endDrag);

  window.setTimeout(() => {
    dragMoved.value = false;
  }, 0);
}

function handleCloseClick(event: MouseEvent) {
  if (dragMoved.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  closeDemo();
}

watch(isDemoOpen, (open) => {
  if (open) {
    lockScroll();
    return;
  }

  unlockScroll();
});

onMounted(() => {
  if (isDemoOpen.value) {
    lockScroll();
  }
});

onBeforeUnmount(() => {
  unlockScroll();
  endDrag();
});
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

    <section class="lab-list" aria-label="Listado de experimentos">
      <article v-for="experiment in experiments" :key="experiment.id" class="lab-card">
        <div class="lab-card__meta">
          <span>{{ experiment.category }}</span>
          <span>{{ experiment.status }}</span>
          <span>{{ experiment.year ?? '2026' }}</span>
        </div>

        <div class="lab-card__body">
          <h2>{{ experiment.title }}</h2>
          <p>{{ experiment.summary }}</p>
        </div>

        <div class="lab-card__actions" aria-label="Acciones del experimento">
          <RouterLink class="secondary-button" :to="`/lab/${experiment.id}`">Details</RouterLink>
          <button class="secondary-button secondary-button--ghost" type="button" @click="openDemo(experiment.title, experiment.summary)">
            Demo
          </button>
        </div>
      </article>
    </section>

    <Teleport to="body">
      <div v-if="isDemoOpen" class="demo-overlay" role="dialog" aria-modal="true" aria-label="Live demo overlay">
        <button
          class="draggable-exit-btn"
          :style="{ left: `${btnPos.x}px`, top: `${btnPos.y}px` }"
          type="button"
          aria-label="Close Demo"
          @mousedown="startDrag"
          @touchstart="startDrag"
          @click="handleCloseClick"
        >
          ×
        </button>

        <div class="demo-placeholder-content">
          <p class="mono-text">LIVE DEMO PLACEHOLDER</p>
          <h2>{{ demoTitle }}</h2>
          <p>{{ demoSummary }}</p>
          <div class="demo-placeholder-content__canvas">
            <span>Studio canvas</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>