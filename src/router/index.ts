import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/Home/Home.vue'),
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('@/views/Callback.vue'),
    },
  ],
})

export default router
