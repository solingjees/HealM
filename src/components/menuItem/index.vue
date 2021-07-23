<template>
  <div class="menu-item-wrapper">
    <div
      class="menu-item"
      :style="{
        'flex-direction': vertical ? 'column' : 'row',
        'align-items': vertical ? 'flex-start' : 'center',
      }"
    >
      <div class="left">
        <img
          v-if="icon !== ''"
          :src="icon"
          alt="图片"
        >
        <div
          class="title"
          :style="{
            'margin-bottom': vertical ? '10px' : '0px',
            'margin-top': vertical ? '10px' : '0px',
          }"
        >
          {{ title }}
        </div>
      </div>
      <div>
        <div
          v-if="value !== ''"
          class="value"
          :style="{
            'margin-bottom': vertical ? '10px' : '0px',
          }"
        >
          {{ value }}
        </div>
        <slot />
      </div>
    </div>
    <hr v-if="separateLine">
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    separateLine: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.menu-item-wrapper {
  width: 100%;
  .menu-item {
    width: 100%;
    min-height: 50px;
    background-color: white;
    .flex(row,space-between,center);
    box-sizing: border-box;
    padding: 0px 15px;

    .left {
      .flex(row,center,center);
      img {
        width: 20px;
        height: 20px;
      }
      .title {
        margin-left: 10px;
        font-size: 16px;
        color: black;
      }
    }
    .value {
      font-size: 16px;
      margin-left: 10px;
      color: @secondColor;
    }
  }

  hr {
    background-color: @thirdColor;
    height: 1px;
    border: none;
  }
}
</style>
