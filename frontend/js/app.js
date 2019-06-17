import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import LandingPage from './components/pages/LandingPage'
import Wahlomat from './components/pages/Wahlomat'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: LandingPage
  },
  {
    path: '/app/:election',
    name: 'App',
    component: Wahlomat
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})