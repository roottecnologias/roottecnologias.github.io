import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import EsteticasView from '@/views/EsteticasView.vue';
import EsteticaDetailView from '@/views/EsteticaDetailView.vue';
import LabView from '@/views/LabView.vue';
import LabDetailView from '@/views/LabDetailView.vue';
import ContactoView from '@/views/ContactoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/esteticas', name: 'esteticas', component: EsteticasView },
    { path: '/esteticas/:slug', name: 'estetica-detail', component: EsteticaDetailView, props: true },
    { path: '/lab', name: 'lab', component: LabView },
    { path: '/lab/:id', name: 'lab-detail', component: LabDetailView, props: true },
    { path: '/contacto', name: 'contacto', component: ContactoView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }

    return { top: 0, behavior: 'smooth' };
  },
});

export default router;