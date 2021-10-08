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
        :value="newUserInfo.avatar === ''?[] : [newUserInfo.avatar]"
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
import { mapActions, mapMutations } from 'vuex'
import { bindQQ } from '@/api/login'
import { UserInfoStorage } from '@/libs/localStorage'
import { getToken } from '@/libs/util'
export default {
  name: 'UserCenter',
  components: {
    UserInfoCard,
    UserInfoItems,
    InputItem
  },
  props: {
    token: {
      type: [String, undefined],
      default: undefined
    },
    openId: {
      type: [String, undefined],
      default: undefined
    },
    state: {
      type: [Boolean],
      default: false
    }
  },
  data: () => ({
    showModal: false,
    newUserInfo: {}
  }),
  computed: {
    userInfo () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.newUserInfo = this.$store.state.user
      return this.$store.state.user
    },
    identity () {
      return this.$store.state.user.identity
    },
    ageList () {
      const _ageList = []
      let age = 1
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
        }, {
          value: '2',
          label: '秘密'
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
  mounted () {
    if (!this.token && !this.openId && !this.state) {
      // 不需要进行处理，默认情况
    } else if (!this.state && this.openId) {
    //  来自于qq可以被绑定的：token：null/undefined，openId(我们要绑定的qq openId)，state=false（qq可以被绑定）（用户已经登录）
      this.bindQQ()
    } else if (this.state && this.token && this.openId && this.token === getToken()) {
      // 用户qq登陆成功
      this.$$Message.success('QQ登陆成功')
    } else if (this.state && this.token && this.openId && this.token !== getToken()) {
      // 已经被绑定了
      this.$Message.error('QQ已经被其他用户绑定')
    } else {
      console.log('未处理的情况')
    }
  },
  methods: {
    ...mapActions(['handleModifyUserInfo']),
    ...mapMutations(['setQQNumber']),
    copy (object) {
      return JSON.parse(JSON.stringify(object))
    },
    changeShowModal (value) {
      this.showModal = value
    },
    changeValue (key, value) {
      console.log(key, value)
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
        postUserInfo.birthday = getAttribute('birthday')
        postUserInfo.age = parseInt(getAttribute('age'))
        postUserInfo.gender = parseInt(getAttribute('gender'))
        postUserInfo.avatar = getAttribute('avatar')
      } else if (this.userInfo.identity === 1) {
        postUserInfo.skill = getAttribute('skill')
        postUserInfo.introduction = getAttribute('introduction')
      }
      const res = await this.handleModifyUserInfo(postUserInfo)
      if (res.status) {
        this.showModal = false
      }
    },
    async bindQQ () {
      const res = await bindQQ({
        openId: this.openId,
        isReplace: false
      })
      this.setQQNumber(this.openId)
      const _user = JSON.parse(JSON.stringify(this.$$store.state.user))
      delete _user.hasGetInfo
      delete _user.token
      UserInfoStorage.setValue(_user)
      if (res.status) {
        // 修改本地信息
        this.$Message.success('绑定QQ成功')
      } else {
        this.$Message.error('绑定QQ失败,' + res.script)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
