import Mock from 'mockjs'
var Random = Mock.Random

Random.extend({
  healthItems: function () {
    var healthItems = ['身高', '体重', '血糖', '血压', '血脂', '排泄物', '皮肤病', '肺活量', '睡眠']
    return this.pick(healthItems, -1, healthItems.length)
  }
})

export const addHealthDetailData = req => {
  return {
    status: true,
    script: '新增详细健康数据成功',
    data: {
      id: '101'
    }
  }
}

export const updateHealthDetailData = req => {
  return {
    status: true,
    script: '编辑详细健康数据成功',
    data: {}
  }
}

export const deleteHealthDetailData = req => {
  return {
    status: true,
    script: '删除详细健康数据成功',
    data: {}
  }
}

export const searchDoctor = req => {
  const { departmentName } = JSON.parse(req.body)
  const num = parseInt(Math.random() * 20 + 1)
  const data = []
  for (let i = 0; i < num; i++) {
    data.push({
      id: Random.integer(0, 30),
      avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
      gender: Random.integer(0, 1),
      department: departmentName,
      hospital: Random.ctitle(2, 10),
      name: Random.cname(),
      position: Random.ctitle(2, 6),
      skill: Random.ctitle(2, 20),
      createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  }
  return {
    status: true,
    script: '查找医生成功',
    data
  }
}

export const getPrescriptionList = req => {
  const num = parseInt(Math.random() * 20 + 1)
  const data = []
  for (let i = 0; i < num; i++) {
    data.push({
      id: Random.integer(0, 30),
      title: Random.ctitle(2, 6) + '处方',
      doctorName: Random.cname(),
      doctorId: Random.integer(0, 100),
      state: Random.integer(0, 2),
      /**
           * 1:进行中
           * 2:已取消
           * 0:已完成
           */
      notUploadHealthItem: Random.healthItems(),
      possibleDisease: Random.ctitle(2, 10),
      createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  }
  return {
    status: true,
    script: '获取处方列表成功',
    data
  }
}
