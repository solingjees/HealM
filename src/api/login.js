import axios from '@/libs/request'
const HEADER = '/login'

/**
 * 登陆接口
 * @param {Object} loginInfo 用户登陆信息
 */
export const normalLogin = (data) => {
  return axios.post(HEADER + '/normalLogin', data)
}

export const sendPhoneVerify = (data) => {
  return axios.post(HEADER + '/sendPhoneVerify', data)
}

export const checkPhoneVerify = (data) => {
  return axios.post(HEADER + '/checkPhoneVerify', data)
}

export const bindQQ = (data) => axios.post(HEADER + '/bindQQ', data)
