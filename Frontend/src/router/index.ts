import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertyDetailView from '../views/PropertyDetailView.vue'
import AddPropertyView from '../views/AddPropertyView.vue' // Wichtig: Den Import nicht vergessen!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/property/:id',
      name: 'property-detail',
      component: PropertyDetailView
    },
    {
      // Das ist die neue Route für dein Formular
      path: '/add',
      name: 'add-property',
      component: AddPropertyView
    }
  ]
})

export default router