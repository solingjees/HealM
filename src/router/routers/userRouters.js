export default [
  {
    path: 'myHealth',
    name: 'myHealth',
    meta: {
      title: '我的健康',
      icon: 'run.png',
      identity: [0]
    },
    component: () => import('@/view/myHealth')
  },
  {
    path: 'healthDetail',
    name: 'healthDetail',
    redirect: { name: 'info' },
    props: route => ({
      healthItemId: route.query.healthItemId,
      userId: route.query.userId,
      initDate: route.query.initDate
    }),
    meta: {
      title: '健康详情',
      hideInMenu: true
    },
    component: () => import('@/view/HealthDetail'),
    children: [
      {
        path: 'info',
        name: 'info',
        meta: {
          title: '健康详情'
        },
        component: () => import('@/view/HealthDetail/components/Info')
      },
      {
        path: 'statistics',
        name: 'statistics',
        meta: {
          title: '健康详情'
        },
        component: () => import('@/view/HealthDetail/components/statistics')
      }
    ]
  },
  {
    path: 'myPhysical',
    name: 'myPhysical',
    meta: {
      title: '我的体检',
      icon: 'shield-cross.png',
      identity: [0]
    },
    component: () => import('@/view/myPhysical')
  },
  {
    path: 'diagnose',
    name: 'diagnose',
    meta: {
      title: '医生问诊',
      icon: 'nurse.png',
      identity: [0]
    },
    component: () => import('@/view/diagnose'),
  },
  {
    path: 'chat',
    name: 'chat',
    component: () => import('@/view/chat'),
    meta: {
      title: '病情聊天',
      hideInMenu: true
    }
  },
  {
    path: 'prescription',
    name: 'prescription',
    component: () => import('@/view/prescription'),
    meta: {
      title: '我的处方',
      icon: 'capsule.png',
      identity: [0]
    }
  },
  {
    path: 'article',
    name: 'article',
    redirect:{ name: 'list' },
    component: () => import('@/view/article'),
    meta: {
      title: '文章推荐',
      icon: 'book.png',
      identity: [0]
    },
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          title: '文章列表'
        },
        component: () => import('@/view/article/components/list')
      },
      {
        path: 'content',
        name: 'content',
        meta: {
          title: '文章详情'
        },
        component: () => import('@/view/article/components/content')
      },
    ]
  }
]
