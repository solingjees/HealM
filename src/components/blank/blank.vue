<template>
  <div
    class="blank"
    :style="{
      width,
      height,
    }"
  />
</template>

<script>
export default {
  name: 'Blank',
  props: {
    height: {
      type: String,
      default: '50px'
    },
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="less" scoped>
@import './blank.less';
</style>
