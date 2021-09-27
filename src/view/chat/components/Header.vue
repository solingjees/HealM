<template>
  <div
    class="header"
  >
    <div
      class="return"
      @click="goBack"
    >
      <img :src="LeftArrowIcon" />
    </div>
    <p class="chatTitle">
      {{ name }}
    </p>
  </div>
</template>

<script>
import LeftArrowIcon from '_icon/left-arrow.png'
export default {
  name: 'ChatHeader',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    LeftArrowIcon
  }),
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.header{
    background-color: white;
    box-shadow: @boxShadow;
    width: 100%;
    position: relative;
    .flex(row,center,center);
    .return{
        position: absolute;
        left: .7rem;
        img{
            width: 40px;
            height: 40px;
        }
    }
    .chatTitle{
        text-align: center;
        font-size: @secondSize;
        height: 3rem;
        line-height: 3rem;
    }
}
</style>
