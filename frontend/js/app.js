import Vue from 'vue'
import App from './components/App'

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  render: x => x(App)
})
