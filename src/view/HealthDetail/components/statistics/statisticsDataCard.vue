<template>
  <div class="statistics-data-card-wrapper">
    <div class="box">
      <div
        v-for="(item, index) in dataList"
        :key="'card-item-' + index"
        class="item"
      >
        <div class="title">
          {{ item.name }}
        </div>
        <div class="content">
          {{ item.data }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsDataCard',
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
@firstItemColor: #2c8cf0;
@secondItemColor: #ec808d;
.statistics-data-card-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1rem;
  .box {
    width: 100%;
    background-color: #efefef;
    min-height: 6rem;
    flex-wrap: wrap !important;
    border-radius: 1rem;
    overflow: hidden;
    .flex(row, space-between, center);
    .item {
      width: 50%;
      height: 6rem;
      .title {
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      .content {
        font-size: 1.2rem;
      }
      border-bottom: 1px solid white;
      .flex(column,center,center);
      &:nth-child(2n-1) {
        .title {
          color: @firstItemColor;
        }
        border-right: 1px solid white;
      }
      &:nth-child(2n) {
        .title {
          color: @secondItemColor;
        }
      }
      &:nth-last-child(2) {
        border-bottom: none;
      }
      &:last-child {
        // border-right: none;
        border-bottom: none;
      }
    }
  }
}
</style>
