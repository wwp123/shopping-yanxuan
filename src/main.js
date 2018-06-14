import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/assets/styles/global.styl'
import '@/assets/iconfont/iconfont.css'
import MintUI from 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
