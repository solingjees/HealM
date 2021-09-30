import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import config from '@/config'
import VueMaterial from 'vue-material' // 引入material ui
import Vuelidate from 'vuelidate'
import importDirective from '@/directive'
// import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import errorHandle from '_utils/errorHandle'
import VueSocketIO from 'vue-socket.io'
import Meta from 'vue-meta'
import './index.less'
import moment from 'moment'
import '@/assets/icons/iconfont.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@vant/touch-emulator' // vant的桌面适配
import { SwipeCell, Notify } from 'vant'

// if (process.env.NODE_ENV !== 'production') require('@/mock')

moment.locale('zh-cn')
ViewUI.LoadingBar.config({
  color: '#54a5f3'
})

Vue.use(ViewUI)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(SwipeCell)
Vue.use(Notify)
Vue.use(Meta)

Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV !== 'production',
  // 连接目标的Socket
  connection: process.env.NODE_ENV !== 'production' ? config.socketUrl.dev : config.socketUrl.pro,
  options: {
    autoConnect: false
    // transports: ['websocket']
  }
}))
// Vue.use(TreeTable)
// Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description axios全局入口
 */
Vue.prototype.$axios = {
  home: require('@/api/home'),
  login: require('@/api/login'),
  user: require('@/api/user'),
  doctor: require('@/api/doctor')
}
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * =@description 全局注册错误处理事件
 */
Vue.prototype.$errorhandle = errorHandle
/**
 * 注册指令
 */
importDirective(Vue)
// Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
