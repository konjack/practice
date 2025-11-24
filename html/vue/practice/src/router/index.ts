import { createRouter, createWebHistory } from 'vue-router'
import Practice from '../views/practice.vue'
import AboutVue from '../views/aboutVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'practice',
      component: Practice,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutVue,
    },

  ],
})

export default router
