import ClientListVue from '@/views/ClientList.vue'
import Home from '@/views/Home.vue'
import ProductClientAssociation from '@/views/ProductClientAssociation.vue'
import ProductListVue from '@/views/ProductList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductListVue
    },
    {
      path: '/clients',
      name: 'ClientList',
      component: ClientListVue
    },
    {
      path: '/associate',
      name: 'ProductClientAssociation',
      component: ProductClientAssociation
    }
  ]
})

export default router
