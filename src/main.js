import Vue from 'vue'
import './client/plugins/vuetify'
import App from './client/App.vue'
import './client/registerServiceWorker'
import router from './client/router'
import store from './client/store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
