<template>
  <div class="user-center-wrapper">
    <UserInfoCard :user-info="userInfo" />
    <UserInfoItems
      :user-info="userInfo"
      @on-show-modal="changeShowModal(true)"
    />
    <Modal
      v-model="showModal"
      title="修改个人信息"
      :loading="true"
      @on-ok="submit"
    >
      <input-item
        v-if="identity === 0"
        title="昵称"
        :value="newUserInfo.name"
        @on-change-value="(value) => changeValue('name', value)"
      />
      <input-item
        v-if="identity === 0"
        title="绑定QQ"
        :value="newUserInfo.qqNumber"
        @on-change-value="(value) => changeValue('qqNumber', value)"
      />
      <input-item
        v-if="identity === 0"
        title="出生日期"
        type="date"
        :value="newUserInfo.birthday"
        @on-change-value="(value) => changeValue('birthday', value)"
      />
      <input-item
        v-if="identity === 0"
        title="年龄"
        type="select"
        :value="newUserInfo.age"
        :range="ageList"
        @on-change-value="(value) => changeValue('age', value)"
      />
      <input-item
        v-if="identity === 0"
        title="性别"
        type="select"
        :value="newUserInfo.gender"
        :range="genderList"
        @on-change-value="(value) => changeValue('gender', value)"
      />
      <input-item
        v-if="identity === 0"
        title="头像"
        type="image"
        :value="newUserInfo.avatar"
        @on-change-value="(value) => changeValue('avatar', value)"
      />
      <!-- doctor -->
      <input-item
        v-if="identity === 1"
        title="擅长"
        type="textarea"
        :value="newUserInfo.skill"
        @on-change-value="(value) => changeValue('skill', value)"
      />
      <input-item
        v-if="identity === 1"
        title="自我介绍"
        type="textarea"
        :value="newUserInfo.introduction"
        @on-change-value="(value) => changeValue('introduction', value)"
      />
    </Modal>
  </div>
</template>

<script>
import UserInfoCard from './components/userInfoCard'
import UserInfoItems from './components/userInfoItems'
import InputItem from '@/components/inputItem'
import { mapActions } from 'vuex'
export default {
  name: 'UserCenter',
  components: {
    UserInfoCard,
    UserInfoItems,
    InputItem
  },
  data: () => ({
    showModal: false,
    newUserInfo: {}
  }),
  computed: {
    userInfo () {
      this.newUserInfo = this.$store.state.user
      return this.$store.state.user
    },
    identity () {
      return this.$store.state.user.identity
    },
    ageList () {
      const _ageList = []
      let age = 0
      while (age <= 120) {
        _ageList.push({
          value: age,
          label: age
        })
        age++
      }
      return _ageList
    },
    genderList () {
      return [
        {
          value: '0',
          label: '女'
        },
        {
          value: '1',
          label: '男'
        }
      ]
    }
  },
  watch: {
    showModal (newval) {
      if (newval) {
        this.newUserInfo = this.copy(this.userInfo)
      }
    }
  },
  methods: {
    ...mapActions(['handleModifyUserInfo']),
    copy (object) {
      return JSON.parse(JSON.stringify(object))
    },
    changeShowModal (value) {
      this.showModal = value
    },
    changeValue (key, value) {
      const _newUserInfo = this.copy(this.newUserInfo)
      _newUserInfo[key] = value
      this.newUserInfo = _newUserInfo
    },
    async submit () {
      const postUserInfo = {}
      const getAttribute = key => {
        return this.newUserInfo[key] || this.userInfo[key]
      }
      if (this.userInfo.identity === 0) {
        // common user
        postUserInfo.name = getAttribute('name')
        postUserInfo.qqNumber = getAttribute('qqNumber')
        postUserInfo.birthday = getAttribute('birthday')
        postUserInfo.age = getAttribute('age')
        postUserInfo.gender = getAttribute('gender')
        postUserInfo.avatar = getAttribute('avatar')
      } else if (this.userInfo.identity === 1) {
        postUserInfo.skill = getAttribute('skill')
        postUserInfo.introduction = getAttribute('introduction')
      }
      const res = await this.handleModifyUserInfo(postUserInfo)
      if (res.status) {
        this.showModal = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
