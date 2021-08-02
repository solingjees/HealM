import axios from '@/libs/request'

const HEADER = '/user'

// 添加健康数据项
export const addHealthDetailData = (data) => axios.post(HEADER + '/addHealthDetailData', data)

// 更新健康数据项
export const updateHealthDetailData = (data) => axios.post(HEADER + '/updateHealthDetailData', data)

// 删除健康数据项
export const deleteHealthDetailData = (data) => axios.post(HEADER + '/deleteHealthDetailData', data)

//获得体检数据
export const getPhysicalData = (data)=>axios.post(HEADER+"/getPhysicalData",data)

//更新和添加体检数据接口
export const updatePhysicalData=(data)=>axios.post(HEADER+"/updatePhysicalData",data)

//获得所有聊天信息
export const getAllChatMessages=(data)=>axios.post(HEADER+"/getAllChatMessages",data)
