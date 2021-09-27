<template>
  <div class="ceil-container">
    <div
      v-for="(item,dataIndex) in dataList"
      :key="'floor-item-'+dataIndex"
      class="floor-item"
      :class="{
        highLight: dataIndex === index
      }"
      @click="handleClick(item,dataIndex)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ceil',
  props: {
    dataList: {
      type: Array,
      default: () => ([])
    },
    index: {
      type: Number,
      default: -1
    }
  },
  methods: {
    handleClick (item, index) {
      this.$emit('on-change', index)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.ceil-container{
    width: 50%;
    height: 100%;
    background-color: white;
    overflow: scroll;
    padding-bottom: 5rem;
    .floor-item{
        width: 100%;
        height: 3rem;
        line-height: 2rem;
        box-sizing: border-box;
        padding: .5rem 1rem;
        color: @titleColor;
        background-color: #fefefe;
        &.highLight{
            background-color: @themeColor;
            color: white;
        }
    }
}
</style>
