<template>
  <div class="third-login-wrapper">
    <div class="line">
      <hr>
      合作账号登录
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
import QQIcon from '_icon/qq_logo.png'
export default {
  name: 'ThirdLogin',
  data: () => ({
    qqIcon: QQIcon
  }),
  computed: {
    qqLoginUrl () {
      return this.$config.qqBindUrl
    }
  },
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
