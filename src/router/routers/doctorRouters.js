export default [
  {
    path: 'patient',
    name: 'patient',
    component: () => import('@/view/diagnose'),
    meta: {
      title: '签约病人',
      icon: 'patient.png',
      identity: [1]
    }
  },
  {
    path: 'edit-prescription',
    name: 'edit-prescription',
    component: () => import('@/view/EditPrescription'),
    meta: {
      title: '编辑处方',
      hideInMenu: true,
      identity: [1]
    },
    props: route => ({
      userId: parseInt(route.query.userId),
      doctorId: parseInt(route.query.doctorId),
      windowId: parseInt(route.query.windowId),
      name: route.query.name
    })
  }
]
