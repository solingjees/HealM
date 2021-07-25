import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'view-design'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
// const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history',
  linkExactActiveClass: 'emphisis'
})

const turnTo = (to, identity, next) => {
  if (canTurnTo(to.name, identity, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'login' }) // 无权限，没有权限，跳转到登录页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (config.openRouters.includes(to.name)) {
    next()
    return
  }
  if (!token || token === '') {
    // token不存在，让用户去登录
    next({
      name: 'login'
    })
  } else {
    // 用户已经登录了
    if (store.state.user.hasGetInfo) {
      // 用户已经获取了自己的信息
      turnTo(to, store.state.user.identity, next)
    } else {
      // 没有获取到用户信息
      store.dispatch('handleGetInfo').then(res => {
        turnTo(to, res.data.identity, next)
      }).catch(() => {
        // 出现问题就设置用户没有登录
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
