import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import LandingPage from './components/pages/LandingPage'
import Wahlomat from './components/pages/Wahlomat'
import WhereToVote from './components/pages/WhereToVote'
import WhenToVote from './components/pages/WhenToVote'
import PanelInfo from './components/pages/PanelInfo'

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
  },
  {
    path: '/info/wheretovote',
    name: 'WhereToVote',
    component: WhereToVote
  },
  {
    path: '/info/whentovote',
    name: 'WhenToVote',
    component: WhenToVote
  },
  {
    path: '/info/:election',
    name: 'PanelInfo',
    component: PanelInfo
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})