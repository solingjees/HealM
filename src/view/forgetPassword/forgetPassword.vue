<template>
  <div class="phone-login">
    <div class="header-word">
      <img
        :src="LeftArrowIcon"
        alt="返回"
        @click="goBack"
      >
      <span>忘记密码</span>
    </div>
    <login-form />
  </div>
</template>

<script>
import LeftArrowIcon from '_icon/left-arrow.png'
import LoginForm from './components/login-form/index.js'
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
@import './forgetPassword.less';
</style>
