import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Analytics',
    component: () => import('../views/Analytics.vue')
  },
  {
    path: '/autorisation',
    name: 'autorisation',
    component: () => import('../views/Autorisation.vue')
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
