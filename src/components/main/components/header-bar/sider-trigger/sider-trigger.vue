<template>
  <a
    type="text"
    class="sider-trigger-a"
    @click="handleChange"
  >
    <img
      :src="menuFillIcon"
      alt="菜单图标"
      size="12"
    ></a>
</template>
<script>
import menuFillIcon from '_icon/menu-fill.png'
export default {
  name: 'SiderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  data () {
    return {
      menuFillIcon
    }
  },
  methods: {
    handleChange () {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
