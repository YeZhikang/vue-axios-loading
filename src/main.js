import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import send from './index'

Vue.config.productionTip = false
Vue.prototype.$send = send

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
