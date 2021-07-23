import axios from '@/libs/request'

const HEADER = '/user'

// 添加健康数据项
export const addHealthDetailData = (data) => axios.post(HEADER + '/addHealthDetailData', data)

// 更新健康数据项
export const updateHealthDetailData = (data) => axios.post(HEADER + '/updateHealthDetailData', data)

// 删除健康数据项
export const deleteHealthDetailData = (data) => axios.post(HEADER + '/deleteHealthDetailData', data)
