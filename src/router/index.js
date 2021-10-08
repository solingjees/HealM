import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'view-design'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
import { UserInfoStorage } from '@/libs/localStorage'
// const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history',
  linkExactActiveClass: 'emphisis'
})

const turnTo = (to, from, identity, next) => {
  if (canTurnTo(to.name, identity, routes)) {
    next()
  } // 有权限，可访问
  else {
    iView.Message.error('您没有该页面的权限')
    iView.LoadingBar.finish()
    next({ replace: true, name: from.name || 'login' }) // 无权限，没有权限，跳转到登录页面
  }
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (config.openRouters.includes(to.name)) {
    next()
    return
  }

  const getUserInfo = () => {
    // 用户已经登录了
    if (store.state.user.hasGetInfo) {
      // 用户已经获取了自己的信息
      turnTo(to, from, store.state.user.identity, next)
    } else {
      // 没有获取到用户信息
      store.dispatch('handleGetInfo').then(res => {
        turnTo(to, from, res.data.identity, next)
      }).catch(() => {
        // 出现问题就设置用户没有登录
        iView.Message.info('您没有权限')
        next({
          name: from.name || 'login'
        })
      })
    }
  }

  const token = getToken()
  if (!token || token === '') {
    UserInfoStorage.clear()
    // token不存在但是参数中有token，就登陆这个用户
    if (to.query.token) {
      setToken(to.query.token)
      getUserInfo()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    getUserInfo()
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
