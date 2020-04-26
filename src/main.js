import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './sass/main.scss'
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$vue = Vue

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
