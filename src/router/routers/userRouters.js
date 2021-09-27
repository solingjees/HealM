import store from '@/store'
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
    props: route => {
      const _query = {
        healthItemId: route.query.healthItemId,
        userId: route.query.userId,
        initDate: route.query.initDate
      }
      if (route.query.edit) _query.edit = parseInt(route.query.edit)
      return _query
    },
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
    props: route => {
      return {
        initDate: route.query.initDate
      }
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
    component: () => import('@/view/diagnose')
  },
  {
    path: 'search',
    name: 'search',
    meta: {
      title: '搜索科室',
      identity: [0],
      hideInMenu: true
    },
    component: () => import('@/view/search')
  },
  {
    path: 'searchResult',
    name: 'searchResult',
    meta: {
      title: route => '搜索:' + route.query.department,
      identity: [0],
      hideInMenu: true
    },
    props: route => ({
      department: route.query.department
    }),
    component: () => import('@/view/searchResult')
  },
  {
    path: 'doctorDescription',
    name: 'doctorDescription',
    meta: {
      title: '医生详情',
      hideInMenu: true
    },
    props: route => ({
      id: route.query.id
    }),
    component: () => import('@/view/doctorDescription')
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
    path: 'prescriptionDetail',
    name: 'prescriptionDetail',
    component: () => import('@/view/PrescriptionDetail'),
    meta: {
      title: '处方详情',
      hideInMenu: true,
      identity: [0]
    },
    props: route => ({
      pid: route.query.pid,
      did: route.query.did,
      uid: store.state.user.id
    })
  },
  {
    path: 'article',
    name: 'article',
    redirect: { name: 'list' },
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
      }
    ]
  }
]
