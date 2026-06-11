import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('@/views/SalesExplorer.vue'),
    },
  ],
})

export default router
