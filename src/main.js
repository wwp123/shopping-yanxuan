import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import transferData from './tools/transferData'

import '@/assets/styles/global.styl'
import '@/assets/iconfont/iconfont.css'
import MintUI from 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted () {
    if (this.$store.state.token) {
      transferData
        .getShoppingCart(JSON.stringify({username: this.$store.state.username}))
        .then(({ data }) => {
          this.$store.dispatch('updateCart', data)
        })
    } else {
      let tempCartGoods = localStorage.getItem('tempCartGoods')
      this.$store.dispatch('updateCart', JSON.parse(tempCartGoods))
    }
  },
  render: (h) => h(App)
}).$mount('#app')
