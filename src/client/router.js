import Vue from 'vue'
import Router from 'vue-router'
import Home from './containers/Home.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './containers/About.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./containers/Projects.vue')
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: () => import('./containers/Explorer.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('./containers/Learn.vue')

    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('./containers/Calendar.vue')

    }
  ]
})
