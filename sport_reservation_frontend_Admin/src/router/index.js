import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'
import CrmView from '../views/CrmView.vue'
import VenueView from '../views/VenueView.vue'
import VenueInfoView from '../views/VenueInfoView.vue'
import VenueUploadView from '../views/VenueUploadView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'orderView',
      component: OrderView
    },
    // {
    //   path: '/crm',
    //   name: 'crmView',
    //   component: CrmView
    // },
    {
      path: '/venue',
      name: 'venueView',
      component: VenueView
    },
    {
      path: '/venueInfo',
      name: 'venueInfoView',
      component: VenueInfoView
    },
    {
      path: '/venueUpload/:id',
      name: 'venueUploadView',
      component: VenueUploadView
    },
  ]
})

export default router
