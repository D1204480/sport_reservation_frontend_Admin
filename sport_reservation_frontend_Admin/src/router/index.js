import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'
import CrmView from '../views/CrmView.vue'
import VenueView from '../views/VenueView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/crm',
      name: 'crm',
      component: CrmView
    },
    {
      path: '/venue',
      name: 'venue',
      component: VenueView
    },
  ]
})

export default router
