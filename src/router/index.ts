import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Livestock from '../views/Livestock.vue'
import Breeds from '../views/Breeds.vue'
import Contacts from '../views/Contacts.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/livestock',
    name: 'Livestock',
    component: Livestock,
  },
  {
    path: '/breeds',
    name: 'Breeds',
    component: Breeds,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
