<template>
  <div
    class="record-item-wrapper"
    :class="{
      highlight: isHighlight,
    }"
  >
    <van-swipe-cell>
      <template #right>
        <van-button
          square
          type="primary"
          color="#2c8cf0"
          text="编辑"
          class="right-button"
          @click="editRecord"
        />
        <van-button
          square
          type="danger"
          text="删除"
          class="right-button"
          @click="deleteRecord"
        />
      </template>
      <div
        class="record-item-content"
        :class="{
          image: type === 'image'
        }"
      >
        <div
          v-for="(item, index) in data.data"
          :key="'record-item-single-data-' + index"
          class="record-item-single-data"
          :class="{
            highlight: isHighlight,
          }"
        >
          <template v-if="type !== 'image'">
            <div class="title">
              {{ dataNameList[index] }}
            </div>
            <div
              class="data"
              :class="{ 'time-data': unit === '无' }"
            >
              {{ item }}{{ unit === '无' ? '' : unit }}
            </div>
          </template>
          <template v-else>
            <img
              :src="item"
              :alt="dataNameList[index]"
            >
          </template>
        </div>
        <div class="record-item-time">
          {{ time }}
        </div>
      </div>
    </van-swipe-cell>
  </div>
</template>

<script>
import moment from 'moment'
import { SwipeCell, Button, Cell } from 'vant'
export default {
  name: 'RecordItem',
  components: {
    'van-swipe-cell': SwipeCell,
    'van-button': Button,
    'van-cell': Cell
  },
  props: {
    dataNameList: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Object,
      default: () => ({})
    },
    isHighlight: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    },
    isTodayRecord: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    time () {
      const _format = this.isTodayRecord ? 'hh:mm' : 'YYYY-MM-DD hh:mm'
      return moment(this.data.createTime).format(_format)
    }
  },
  methods: {
    editRecord () {
      this.$emit('on-edit')
    },
    deleteRecord () {
      this.$emit('on-delete')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
@firstItemColor: #2c8cf0;
@secondItemColor: #ec808d;
.record-item-wrapper {
  width: 100%;
  height: fit-content;
  border: none;
  box-shadow: 0px 0px 1px 1px #cdcdcd;
  border-radius: 0.5rem;
  margin: 0.6rem 0rem;
  background-color: #f2f2f2;
  transform: scale(1);
  transition: 0.3s transform;
  &.highlight {
    border: 2px solid @themeColor;
    background-color: @themeColor;
    transform: scale(1.05);
    transition: 0.3s transform;
  }
}
.record-item-content {
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1rem;
  height: fit-content;
  .flex(row,space-between,center);
   &.image{
      border-right: none;
      .flex(row,flex-start,center);
    }
  .record-item-single-data {
    flex: 1;
    margin: 0.5rem 0rem;
    border-right: 1px solid #cdcdcd;
    .flex(column,center,center);
    img{
      width: 2rem;
    }
    &.highlight {
      .title {
        color: white !important;
      }
      .data {
        color: white;
      }
    }
    .title {
      font-size: 1rem;
    }
    .data {
      margin-top: 0.2rem;
      font-size: 1.2rem;
      padding: 0rem 0.3rem;
      &.time-data {
        font-size: 0.5rem;
      }
    }
    &:first-child {
      .title {
        color: @firstItemColor;
      }
    }
    &:nth-child(2) {
      .title {
        color: @secondItemColor;
      }
    }
    &:last-child {
      border-right: none;
    }
  }
  .record-item-time {
    font-size: 0.8rem;
    margin-left: 0.4rem;
    background-color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
  }
}

.right-button {
  height: 100%;
  width: 4rem;
}
</style>
