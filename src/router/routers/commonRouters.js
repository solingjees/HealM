export default [
  {
    path: 'login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: 'phoneLogin',
    name: 'phoneLogin',
    component: () => import('@/view/phoneLogin'),
    meta: {
      title: '手机号登录',
      hideInMenu: true
    }
  },
  {
    path: 'forgetPassword',
    name: 'forgetPassword',
    component: () => import('@/view/forgetPassword'),
    meta: {
      title: '忘记密码',
      hideInMenu: true
    }
  },
  {
    path: 'resetPassword',
    name: 'resetPassword',
    component: () => import('@/view/resetPassword'),
    meta: {
      title: '设置密码',
      hideInMenu: true
    }
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/view/about'),
    meta: {
      title: '关于我们',
      hideInMenu: true
    }
  },
  {
    path: 'userCenter',
    name: 'userCenter',
    component: () => import('@/view/userCenter'),
    meta: {
      title: '用户中心',
      hideInMenu: true
    }
  }
]
