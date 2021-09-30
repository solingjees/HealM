import axios from 'axios'
import config from '@/config'
import qs from 'qs'

const generate = data => ({
  ...data,
  key: config.wxApiKey
})

export const getWxNew = data => axios.get(config.wxRequestUrl + '/wxnew/index?' + qs.stringify(generate(data)))

export const getWxContent = data => axios.get(config.wxRequestUrl + '/txapi/wxview/index?' + qs.stringify(generate(data)))
