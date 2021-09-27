import axios from '@/libs/request'
import qs from 'qs'

const HEADER = '/home'

const getApi = (endString) => HEADER + endString

export const getInfo = (data) => axios.get(getApi('/getInfo?') + qs.stringify(data))

export const resetPassword = data => axios.post(getApi('/resetPassword'), data)

export const updateInfo = (data) => axios.post(getApi('/updateInfo'), data)

export const getHealthData = (data) => axios.post(HEADER + '/getHealthData', data)

export const getHealthDetailData = (data) => axios.post(HEADER + '/getHealthDetailData', data)

export const getHealthStatisticsData = (data) => axios.post(HEADER + '/getHealthStatisticsData', data)

/**
 * 获取聊天列表数据
 * @param {*} data
 * @returns promise
 */
export const getChatList = (data) => axios.post(HEADER + '/getChatList', data)

/**
 * 获取处方详情
 * @param {Object} data 提交数据
 * @returns promise
 */
export const getPrescriptionDetail = data => axios.post(HEADER + '/getPrescriptionDetail', data)

/// 结束签约
export const completeContract = (data) => axios.post(HEADER + '/completeContract', data)
