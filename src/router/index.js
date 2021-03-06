import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/components/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

export default router
