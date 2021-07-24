export default [
  {
    path: 'patient',
    name: 'patient',
    component: () => import('@/view/patient'),
    meta: {
      title: '签约病人',
      icon: 'patient.png',
      identity: [1]
    }
  },
  {
    path: 'chat',
    name: 'chat',
    component: () => import('@/view/chat'),
    meta: {
      title: '病情聊天',
      icon: 'chat.png',
      identity: [1]
    }
  }
]
