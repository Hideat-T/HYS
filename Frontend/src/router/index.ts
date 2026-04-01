import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertyDetailView from '../views/PropertyDetailView.vue'
import AddPropertyView from '../views/AddPropertyView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import MyListingsView from '../views/MyListingsView.vue'
// [SECTION: IMPORT EDIT VIEW]
import EditPropertyView from '../views/EditPropertyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/property/:id', name: 'property-detail', component: PropertyDetailView },
    { path: '/add', name: 'add-property', component: AddPropertyView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/my-listings', name: 'my-listings', component: MyListingsView },
    
    // [SECTION: EDIT ROUTE - INSIDE THE ARRAY]
    { 
      path: '/edit/:id', 
      name: 'edit-property', 
      component: EditPropertyView 
    }
  ]
})

export default router