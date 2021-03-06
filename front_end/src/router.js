import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/zhoubao',
      name: 'zhoubao',
      component: () => import('./views/Zhoubao.vue')
    },
    {
      path: '*',
      component: () => import('./views/Notfound.vue')
    }
  ]
})
