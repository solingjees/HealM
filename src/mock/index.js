import Mock from 'mockjs'
import { normalLogin, sendPhoneVerify, checkPhoneVerify } from './login'
import { getInfo, resetPassword, uploadFile, updateInfo, getHealthData, getHealthDetailData, getHealthStatisticsData, getChatList } from './home'
import { addHealthDetailData, updateHealthDetailData, deleteHealthDetailData, getPrescriptionList, searchDoctor } from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
// Mock.mock(/\/login\/normalLogin/, normalLogin)

// 公共角色
// Mock.mock(/\/home\/getInfo/, getInfo)

// 获取手机验证码
// Mock.mock(/\/login\/sendPhoneVerify/, sendPhoneVerify)

// 手机号验证码校验
// Mock.mock(/\/login\/checkPhoneVerify/, checkPhoneVerify)

// 更新密码
Mock.mock(/\/home\/resetPassword/, resetPassword)

// 上传图片
// Mock.mock(/\/home\/uploadFile/, uploadFile)

// 更新用户信息
Mock.mock(/\/home\/updateInfo/, updateInfo)

// 获取用户健康数据
// Mock.mock(/\/home\/getHealthData/, getHealthData)

// 获取用户详细健康数据
Mock.mock(/\/home\/getHealthDetailData/, getHealthDetailData)

// 更新用户数据
// Mock.mock(/\/user\/addHealthDetailData/, addHealthDetailData)

// 编辑用户健康记录
Mock.mock(/\/user\/updateHealthDetailData/, updateHealthDetailData)

// 删除用户健康记录
Mock.mock(/\/user\/deleteHealthDetailData/, deleteHealthDetailData)

// 获取用户的处方列表
// Mock.mock(/\/user\/getPrescriptionList/, getPrescriptionList)

// 获取用户健康统计
Mock.mock(/\/home\/getHealthStatisticsData/, getHealthStatisticsData)

// 获取聊天列表
// Mock.mock(/\/home\/getChatList/, getChatList)

// 获取医生列表
// Mock.mock(/\/user\/searchDoctor/, searchDoctor)

export default Mock
