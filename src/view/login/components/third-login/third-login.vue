<template>
  <div class="third-login-wrapper">
    <div class="line">
      <hr>
      第三方登录
      <hr>
    </div>
    <div class="button-group">
      <a
        class="button"
        :href="qqLoginUrl"
      >
        <img
          :src="qqIcon"
          alt="qq登录"
        >
      </a>
    </div>
    <div
      class="line3"
      @click="goToPhoneLogin"
    >
      没有账号?立即注册
    </div>
  </div>
</template>

<script>
import QQIcon from '_icon/qq-fill.png'
export default {
  name: 'ThirdLogin',
  data: () => ({
    qqIcon: QQIcon,
    qqLoginUrl: 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101957782&redirect_uri=http%3A%2F%2Fwww.vaccum.ltd%2FqqLogin&state=test&display=mobile'
  }),
  methods: {
    goToPhoneLogin () {
      this.$router.push({
        name: 'phoneLogin'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './third-login.less';
</style>
