import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/villages',
      name: 'villages',
      component: () => import('../views/VillagesView.vue'),
    },
    {
      path: '/culture',
      name: 'culture',
      component: () => import('../views/CultureView.vue'),
    },
    {
      path: '/academic',
      name: 'academic',
      component: () => import('../views/AcademicView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // 404 页面路由 - 必须放在所有路由的最后
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
