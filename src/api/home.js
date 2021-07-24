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
