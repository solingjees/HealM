<template>
  <div class="phone-login">
    <div class="header-word">
      <span>设置密码</span>
    </div>
    <login-form />
  </div>
</template>

<script>
import LoginForm from './components/login-form/index.js'
export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="less" scoped>
@import './resetPassword.less';
</style>
