import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue')
    },
    {
      path: '/virtual-room',
      name: 'virtual-room',
      component: () => import('../views/VirtualRoomView.vue')
    },
    {
      path: '/artists',
      name: 'artists',
      component: () => import('../views/ArtistsView.vue')
    },
    {
      path: '/artwork/:id',
      name: 'artwork-detail',
      component: () => import('../views/ArtworkDetailView.vue')
    }
  ]
})

export default router 