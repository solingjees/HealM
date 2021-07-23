import { getInfo, resetPassword, updateInfo } from '@/api/home'
import { normalLogin } from '@/api/login'
import { setToken, getToken } from '@/libs/util'
import { UserInfoStorage } from '@/libs/localStorage'

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
    handleLogin ({ commit }, { phoneNumber, password }) {
      return new Promise(async (resolve, reject) => {
        normalLogin({
          phoneNumber, password
        }).then(res => {
          if (res.status) {
            // 登录成功
            const data = res.data
            commit('setToken', data.token)
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
          this.commit('setIdentity', -1)
          resolve(true)
        } catch {
          reject(false)
        }
      })
    },
    handleGetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (res.status) {
            // 获取用户信息成功
            const data = res.data
            commit('setIdentity', data.identity)
            commit('setId', data.id)
            commit('setPhoneNumber', data.phoneNumber)
            commit('setName', data.name)
            commit('setAvatar', data.avatar)
            commit('setGender', data.gender)
            if (parseInt(data.identity)) {
              // 医生
              commit('setHospital', data.hospital)
              commit('setDepartment', data.department)
              commit('setPosition', data.position)
              commit('setSkill', data.skill)
              commit('setIntroduction', data.introduction)
            } else {
              // 普通用户
              commit('setBirthday', data.birthday)
              commit('setAge', data.age)
            }
            commit('setHasGetInfo', true)
            UserInfoStorage.setValue(data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
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
