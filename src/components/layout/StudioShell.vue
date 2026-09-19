<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import StudioFooter from '@/components/footer/StudioFooter.vue';
import { studioNavigation } from '@/data/navigation';

const route = useRoute();
const menuOpen = ref(false);
const isAestheticExperience = computed(() => route.path === '/esteticas/terminal-bloom/live');

const currentLabel = computed(() => {
  const currentItem = studioNavigation.find((item) => item.to === route.path);
  return currentItem?.label ?? 'Root Tecnologias';
});

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <RouterView v-if="isAestheticExperience" />

  <div v-else class="app-shell">
    <a class="skip-link" href="#main-content">Saltar al contenido</a>

    <header class="site-header">
      <RouterLink class="wordmark" to="/" @click="closeMenu">
        <span>Root Tecnologias</span>
        <small>Creative studio</small>
      </RouterLink>

      <nav class="desktop-nav" aria-label="Navegación principal">
        <RouterLink
          v-for="item in studioNavigation"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ 'is-active': route.path === item.to }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="mobile-nav" @click="menuOpen = !menuOpen">
        <span>{{ menuOpen ? 'Cerrar' : 'Menú' }}</span>
        <span class="menu-toggle__label">{{ currentLabel }}</span>
      </button>

      <Transition name="menu-panel">
        <div v-if="menuOpen" id="mobile-nav" class="mobile-nav" role="dialog" aria-label="Navegación móvil">
          <RouterLink
            v-for="item in studioNavigation"
            :key="item.to"
            :to="item.to"
            class="mobile-nav__link"
            :class="{ 'is-active': route.path === item.to }"
            @click="closeMenu"
          >
            <span>{{ item.label }}</span>
            <small>{{ item.hint }}</small>
          </RouterLink>
        </div>
      </Transition>
    </header>

    <main id="main-content" class="page-frame">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <StudioFooter />
  </div>
</template>