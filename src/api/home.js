import axios from '@/libs/request'
import qs from 'qs'
import { getToken } from '@/libs/util'

const HEADER = '/home'

const getApi = (endString) => HEADER + endString

export const getInfo = (data) => axios.post(getApi('/getInfo'), data)

export const resetPassword = data => axios.post(getApi('/resetPassword'), data)

export const updateInfo = (data) => axios.post(getApi('/updateInfo'), data)

export const getHealthData = (data) => axios.get(HEADER + '/getHealthData?' + qs.stringify(data))

export const getHealthDetailData = (data) => axios.post(HEADER + '/getHealthDetailData', data)

export const getHealthStatisticsData = (data) => axios.post(HEADER + '/getHealthStatisticsData', data)
