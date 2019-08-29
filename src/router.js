import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tables from './views/Tables.vue'
import Records from './views/Records.vue'
import Graphiql from './views/Graphiql.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables
    },
    {
      path: '/tables/:id',
      name: 'records',
      component: Records
    },
    {
      path: '/query',
      name: 'graphql',
      component: Graphiql
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
