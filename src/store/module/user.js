import { getInfo, resetPassword, updateInfo } from '@/api/home'
import { normalLogin, checkPhoneVerify } from '@/api/login'
import { setToken, getToken } from '@/libs/util'
import { UserInfoStorage } from '@/libs/localStorage'
import store from '../index'

export default {
  state: {
    hasGetInfo: false,
    token: getToken(),
    id: '',
    identity: -1, // 0表示用户，1表示医生,-1表示未登录的用户
    phoneNumber: '',
    qqNumber: '',
    name: '',
    avatar: '',
    gender: '',
    birthday: '', // 1970-1-10
    age: '',
    // 医生专属
    hospital: '', // 医院
    department: '', // 科室
    position: '', // 职位
    skill: '', // 擅长
    introduction: '' // 介绍
  },
  mutations: {
    setHasGetInfo (state, hasGetInfo) {
      state.hasGetInfo = hasGetInfo
    },
    setUserInfo (state, userInfo) {
      state.identity = userInfo.identity
      state.id = userInfo.id
      state.phoneNumber = userInfo.phoneNumber
      state.name = userInfo.name
      state.avatar = userInfo.avatar
      state.gender = userInfo.gender

      if (parseInt(userInfo.identity)) {
        // 医生
        state.hospital = userInfo.hospital
        state.department = userInfo.department
        state.position = userInfo.position
        state.skill = userInfo.skill
        state.introduction = userInfo.introduction
      } else {
        // 普通用户
        state.birthday = userInfo.birthday
        state.age = userInfo.age
      }
      state.hasGetInfo = true
    },
    setId (state, id) {
      state.id = id
    },
    setQQNumber (state, qqNumber) {
      state.qqNumber = qqNumber
    },
    setIdentity (state, identity) {
      state.identity = identity
    },
    setPhoneNumber (state, phoneNumber) {
      state.phoneNumber = phoneNumber
    },
    setName (state, name) {
      state.name = name
    },
    setAvatar (state, avatar) {
      state.avatar = avatar
    },
    setGender (state, gender) {
      state.gender = gender
    },
    setBirthday (state, birthday) {
      state.birthday = birthday
    },
    setAge (state, age) {
      state.age = age
    },
    setHospital (state, hospital) {
      state.hospital = hospital
    },
    setDepartment (state, department) {
      state.department = department
    },
    setPosition (state, position) {
      state.position = position
    },
    setSkill (state, skill) {
      state.skill = skill
    },
    setIntroduction (state, introduction) {
      state.introduction = introduction
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit, dispatch }, { phoneNumber, password }) {
      return new Promise((resolve, reject) => {
        normalLogin({
          phoneNumber, password
        }).then(res => {
          if (res.status) {
            // 登录成功
            const data = res.data
            commit('setToken', data.token)
            UserInfoStorage.clear()
            dispatch('handleGetInfo')
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登录
    handlePhoneLogin ({ commit, dispatch }, { phoneNumber, verifyCode }) {
      return new Promise((resolve, reject) => {
        checkPhoneVerify({
          phoneNumber, verifyCode
        }).then(res => {
          if (res.status) {
            // 验证成功
            const data = res.data
            commit('setToken', data.token)
            UserInfoStorage.clear()
            dispatch('handleGetInfo')
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogout ({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          this.commit('setToken', '')
          this.commit('setHasGetInfo', false)
          UserInfoStorage.clear()
          resolve(true)
        } catch {
          reject(false)
        }
      })
    },
    handleGetInfo ({ commit }, enforceGetFromServer = false) {
      return new Promise((resolve, reject) => {
        const store_userInfo = UserInfoStorage.getValue()
        if (!enforceGetFromServer && store_userInfo) {
          // 本地有数据，从本地获取，并存储到store
          commit('setUserInfo', store_userInfo)
          resolve({
            status: true,
            data: store_userInfo
          })
        } else {
          // 本地没有，从服务器获取，并存储到store中
          getInfo().then(res => {
            if (res.status) {
              commit('setUserInfo', res.data)
              UserInfoStorage.setValue(res.data)
              resolve(res)
            }
          }).catch(err => {
            reject(err)
          })
        }
      })
    },
    handleResetPassword ({ commit }, { newPassword }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await resetPassword({ newPassword })
          resolve(res)
        } catch (err) {
          reject(err)
        }
      })
    },
    handleModifyUserInfo ({ commit, state }, newUserInfo) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await updateInfo(newUserInfo)
          if (res.status) {
            if (state.identity === 0) {
              // common user
              commit('setQQNumber', newUserInfo.qqNumber)
              commit('setName', newUserInfo.name)
              commit('setAvatar', newUserInfo.avatar)
              commit('setGender', newUserInfo.gender)
              commit('setBirthday', newUserInfo.birthday)
              commit('setAge', newUserInfo.age)
            } else if (state.identity === 1) {
              // doctor
              commit('setSkill', newUserInfo.skill)
              commit('setIntroduction', newUserInfo.introduction)
            }
          }
          resolve(res)
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
