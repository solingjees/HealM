<template>
  <div class="third-login-wrapper">
    <div class="line">
      <hr>
      第三方登录
      <hr>
    </div>
    <div class="button-group">
      <div class="button">
        <img
          :src="qqIcon"
          alt="qq登录"
        >
      </div>
    </div>
    <div class="line3">
      没有账号?立即注册
    </div>
  </div>
</template>

<script>
import QQIcon from '_icon/qq-fill.png'
export default {
  name: 'ThirdLogin',
  data: () => ({
    qqIcon: QQIcon
  })
}
</script>

<style lang="less" scoped>
@import './third-login.less';
</style>
