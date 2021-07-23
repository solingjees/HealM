<template>
  <div class="about-wrapper">
    <img
      :src="LogoIcon"
      alt="logo"
    >
    <p class="content">
      &nbsp;&nbsp;本平台是一家专注于健康管理、体检报告分析、医患沟通的网站，研究该方面
      较长时间，具有丰富的建设能力，平台与大量医院达成合作伙伴关系，贴心为用户
      提供更加优质的服务，致力于打造多方整合的统一沟通平台.
    </p>
    <div class="copyright">
      @COPYRIGHT 2021 HealM
    </div>
  </div>
</template>

<script>
import LogoIcon from '_images/logo.png'
export default {
  name: 'About',
  data: () => ({
    LogoIcon
  })
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.about-wrapper {
  width: 100%;
  min-height: ~'calc(100vh - 50px)';
  .flex(column,flex-start,center);
  img {
    width: 60%;
  }
  .content {
    width: 80%;
    line-height: 22px;
    text-indent: 2rem;
    font-size: 18px;
    color: @titleColor;
    letter-spacing: 0.2rem;
  }
  .copyright {
    color: @thirdColor;
    font-size: 15px;
    position: fixed;
    bottom: 10px;
    left: 0px;
    width: 100%;
    text-align: center;
  }
}
</style>
