<template>
  <div class="floor-container">
    <div
      v-for="(item,index) in dataList"
      :key="'floor-item-'+index"
      class="floor-item"
      :class="{
        highLight: highLightIndex === index
      }"
      @click="handleClick(item,index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  props: {
    dataList: {
      type: Array,
      default: () => ([])
    },
    floorItem: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    highLightIndex: -1
  }),
  methods: {
    handleClick (item, index) {
      this.highLightIndex = index
      this.$emit('on-change', item)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.floor-container{
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    padding-bottom: 5rem;
    overflow: scroll;
    background-color: #f6f6f6;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .floor-item{
        width: 100%;
        height: 3rem;
        line-height: 2rem;
        box-sizing: border-box;
        padding: .5rem 1rem;
        color: @titleColor;
        &.highLight{
            background-color: @themeColor;
            color: white;
        }
    }

}
</style>
