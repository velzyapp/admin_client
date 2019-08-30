import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tables from './views/Tables.vue'
import Records from './views/Records.vue'
import Graphiql from './views/Graphiql.vue'
import Deployment from './views/deployment/Index.vue'
import FreeDeployment from './views/deployment/Free.vue'
import APIKeys from './views/auth/APIKeys.vue'
import Providers from './views/auth/Providers.vue'
import Users from './views/auth/Users.vue'


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
      path: '/deployment',
      name: 'deployment',
      component: Deployment
    },
    {
      path: '/deployment/free',
      name: 'freeDeployment',
      component: FreeDeployment
    },
    {
      path: '/auth/apikeys',
      name: 'apikeys',
      component: APIKeys
    },
    {
      path: '/auth/users',
      name: 'users',
      component: Users
    },
    {
      path: '/auth/providers',
      name: 'providers',
      component: Providers
    },
  ]
})
