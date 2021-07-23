<template>
  <div class="login">
    <div class="header-word">
      账号密码登录
    </div>
    <login-form />
    <third-login />
  </div>
</template>

<script>
import LoginForm from './components/login-form'
import ThirdLogin from './components/third-login'
export default {
  components: {
    LoginForm,
    ThirdLogin
  }
}
</script>

<style lang="less">
@import './login.less';
</style>
