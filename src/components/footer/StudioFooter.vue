<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { studioNavigation } from '@/data/navigation';
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>
        <p class="footer-kicker">Root Tecnologias Studio</p>
        <p class="footer-copy">Digital studio / creative laboratory, 2026.</p>
      </div>

      <nav class="footer-nav" aria-label="Navegación del pie de página">
        <RouterLink v-for="item in studioNavigation" :key="item.to" :to="item.to">
          {{ item.label }}
        </RouterLink>
        <RouterLink to="/contacto">Escribir</RouterLink>
      </nav>

      <div class="footer-meta">
        <a href="mailto:hola@roottecnologias.studio">hola@roottecnologias.studio</a>
        <a href="#">Behance</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  </footer>
</template>