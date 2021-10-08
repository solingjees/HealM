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
    },
    props: route => {
      return {
        token: route.query.token,
        openId: route.query.openId,
        state: route.query.state == 'true' || route.query.state == true
      }
    }
  },
  {
    path: 'chat',
    name: 'chat',
    props: route => {
      return {
        windowId: parseInt(route.query.windowId),
        name: route.query.name,
        opponentId: parseInt(route.query.opponentId),
        isAssigned: route.query.isAssigned == 'true' || route.query.isAssigned == true
      }
    },
    component: () => import('@/view/chat/index.vue'),
    meta: {
      title: '病情聊天',
      icon: 'chat.png',
      hideInMenu: true
    },
    children: [
      {
        path: 'chat-patient',
        name: 'chat-patient',
        props: true,
        meta: {
          title: '病情聊天'
        },
        component: () => import('@/view/chat/components/childrens/patient.vue')
      },
      {
        path: 'chat-doctor',
        name: 'chat-doctor',
        props: true,
        meta: {
          title: '病情聊天'
        },
        component: () => import('@/view/chat/components/childrens/doctor.vue')
      }
    ]
  }

]
