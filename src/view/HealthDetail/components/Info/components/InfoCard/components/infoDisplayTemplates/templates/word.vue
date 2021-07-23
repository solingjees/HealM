<template>
  <div class="dataDisplay">
    <div class="number">
      <div class="number-item">
        <!-- 存在今天的数据 -->
        <template v-if="index !== -1">
          <!-- <div class="number-item-title">
            {{ healthItemAttr.name }}
          </div> -->
          <div class="number-item-data">
            {{ recordData[index].data[0] }}{{ healthItemAttr.unit }}
          </div>
          <div
            v-if="index < recordData.length - 1"
            class="stream"
          >
            {{
              Number(recordData[index].data[0]) ===
                Number(recordData[index + 1].data[0])
                ? ''
                : '距离上次'
            }}
            <img
              :src="
                Number(recordData[index].data[0]) >
                  Number(recordData[index + 1].data[0])
                  ? UpIcon
                  : Number(recordData[index].data[0]) <
                    Number(recordData[index + 1].data[0])
                    ? DownIcon
                    : EqualIcon
              "
              alt="compare"
            >
            {{
              Number(recordData[index].data[0]) ===
                Number(recordData[index + 1].data[0])
                ? '距上次记录无变化'
                : Math.abs(
                  Number(
                    require('bignumber.js')(recordData[index].data).minus(
                      require('bignumber.js')(recordData[index + 1].data)
                    )
                  )
                ) + healthItemAttr.unit
            }}
          </div>
        </template>
        <template v-else>
          <div id="noData">
            暂无数据
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import UpIcon from '_icon/up.png'
import DownIcon from '_icon/down.png'
import EqualIcon from '_icon/equal.png'
import moment from 'moment'
export default {
  name: 'InfoDisplayTemplateWord',
  props: {
    healthItemAttr: {
      type: Object,
      default: () => ({})
    },
    recordData: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    UpIcon,
    DownIcon,
    EqualIcon
  })
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.dataDisplay {
  width: 100%;
  padding-top: 1rem;
  .number {
    width: 100%;
    .flex(row,center,center);

    .number-item {
      &:first-child {
        border-left: 0px;
      }
      border-left: 1px solid @thirdColor;
      box-sizing: border-box;
      min-width: 9.375rem;
      // background-color: white;
      // border-radius: 0.3125rem;
      // box-shadow: 0px 0px 1px 1px #cdcdcd;
      padding: 0.625rem;
      margin: 0.3125rem;
      .flex(column,center,center);
      .number-item-title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      .number-item-data {
        font-size: 2rem;
        color: @themeColor;
      }
      .stream {
        font-size: 1rem;
        margin-top: 0.7rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      #noData {
        font-size: 2rem;
        color: @secondColor;
      }
    }
  }
}
</style>
