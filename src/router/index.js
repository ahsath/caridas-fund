import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/terminos-y-condiciones',
      name: 'Terms and conditions',
      component: () => import(/* webpackChunkName: "Term&Conditions.vue" */ '../views/TermsAndConditions.vue')
    },
    {
      path: '/acerca',
      name: 'About',
      component: () => import(/* webpackChunkName: "About.vue" */ '../views/About.vue')
    },
  ]
})

export default router
