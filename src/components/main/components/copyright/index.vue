<template>
  <div class="copyright">
    @COPYRIGHT 2021 HealM
  </div>
</template>

<script>
export default {
  vbase: 'copyright'
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.copyright {
  color: @thirdColor;
  font-size: 15px;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>
