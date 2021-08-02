import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import config from '@/config'
import VueMaterial from 'vue-material' // 引入material ui
import Vuelidate from 'vuelidate'
// import importDirective from '@/directive'
// import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import errorHandle from '_utils/errorHandle'
import VueSocketIO from 'vue-socket.io'
import Meta from 'vue-meta'

import './index.less'
import '@/assets/icons/iconfont.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@vant/touch-emulator' // vant的桌面适配
import { SwipeCell } from 'vant'

// import TreeTable from 'tree-table-vue'
// import VOrgTree from 'v-org-tree'
// import 'v-org-tree/dist/v-org-tree.css'
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

ViewUI.LoadingBar.config({
   color: '#54a5f3'
})

Vue.use(ViewUI)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(SwipeCell)
Vue.use(Meta)

Vue.use(new VueSocketIO({
  debug: false,
  //连接目标的Socket
  connection: 'http://localhost:9999',
  options:{
      autoConnect:false
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
// importDirective(Vue)
// Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
