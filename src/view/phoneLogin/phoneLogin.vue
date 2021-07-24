<template>
  <div class="phone-login">
    <div class="header-word">
      <img
        :src="LeftArrowIcon"
        alt="返回"
        @click="goBack"
      >
      <span>手机号登录</span>
    </div>
    <login-form />
    <div class="tips-line">
      若手机号未注册,视为自动注册
    </div>
  </div>
</template>

<script>
import LeftArrowIcon from '_icon/left-arrow.png'
import LoginForm from './components/loginForm'
export default {
  components: {
    LoginForm
  },
  data: () => ({
    LeftArrowIcon
  }),
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@import './phoneLogin.less';
</style>
