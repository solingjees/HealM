<template>
  <div
    class="mask"
    @click.stop="clickMask"
  />
</template>

<script>
export default {
  name: 'MyMask',
  methods: {
    clickMask () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
@import './mask.less';
</style>
