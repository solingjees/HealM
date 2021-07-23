<template>
  <div class="advice">
    <div class="advice-item">
      <div class="left">
        可能状态
      </div>
      <div
        class="right"
        :class="{
          red: adviceColor === 'red',
          green: adviceColor === 'green',
        }"
      >
        {{ possibleState || '无' }}
      </div>
    </div>
    <div class="advice-item">
      <div class="left">
        建议
      </div>
      <div class="right">
        {{ advice || '无' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Advice',
  props: {
    adviceColor: {
      type: String,
      default: 'green'
    },
    possibleState: {
      type: String,
      default: ''
    },
    advice: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.advice {
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  .flex(column,center,center);
  .advice-item {
    margin-bottom: 0.5rem;
    width: 100%;
    .flex(row,flex-start,flex-start);
    .left {
      width: 6rem;
      font-size: 1.2rem;
      color: @titleColor;
    }
    .right {
      flex: 1;
      font-size: 1.2rem;
      color: @themeColor;
      &.red {
        color: orange;
      }
      &.green {
        color: green;
      }
    }
  }
}
</style>
