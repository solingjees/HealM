<template>
  <div class="advice-container">
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
.advice-container{
  margin-top: 1rem;
  box-sizing: border-box;
  width: 100%;
  padding-top: 2rem;
  padding: 0rem 2rem;
}

.advice {
  padding: 0.5rem 1rem;
  background-color: white;
  box-shadow:@boxShadow;
  border-radius: 1rem;
  .flex(column,center,center);
  .advice-item {
    width: 100%;
    margin: .1rem 0rem;
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
