import Mock from 'mockjs'

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
