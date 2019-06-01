import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/routering'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/styles/index.styl'
import '@/styles/mintui.styl'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(MintUI)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
