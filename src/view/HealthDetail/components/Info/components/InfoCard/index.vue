<template>
  <div class="info-card-wrapper">
    <div class="transformDate">
      <DatePicker
        :open="openSelectDate"
        :value="date"
        type="date"
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-ok="handleOK"
      >
        <div
          class="datePicker-template"
          @click="handleClickTransformDate"
        >
          <span>{{
            require('moment')(date).format('YYYY-MM-DD') ===
              require('moment')().format('YYYY-MM-DD')
              ? '今天'
              : date
          }}</span>
          <img
            :src="DownArrowIcon"
            alt="downArrow"
          >
        </div>
      </DatePicker>
    </div>
    <InfoDisplayTemplates
      :health-item-attr="healthDetailData.itemData"
      :record-data="healthDetailData.recordData"
      :index="index"
      :date="date"
    />
    <advice
      v-if="healthDetailData.possibleState"
      :advice-color="healthDetailData.adviceColor"
      :possible-state="healthDetailData.possibleState"
      :advice="healthDetailData.advice"
    />
  </div>
</template>

<script>
import DownArrowIcon from '_icon/downArrow.png'
import Advice from './components/advice'
import InfoDisplayTemplates from './components/infoDisplayTemplates'
import moment from 'moment'
export default {
  name: 'InfoCard',
  components: {
    Advice,
    InfoDisplayTemplates
  },
  props: {
    healthItemId: {
      type: [String, Number],
      default: ''
    },
    userId: {
      type: [String, Number],
      default: ''
    },
    healthDetailData: {
      type: Object,
      default: () => ({})
    },
    date: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    openSelectDate: false,
    DownArrowIcon
  }),
  methods: {
    handleOK () {
      this.openSelectDate = false
    },
    handleChange (date) {
      this.openSelectDate = false
      this.$emit('on-change-date', date)
    },
    handleClickTransformDate () {
      this.openSelectDate = !this.openSelectDate
    },
    handleClear () {
      this.openSelectDate = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.info-card-wrapper {
  .flex(column,space-around,center);
  width: 100%;
  .transformDate {
    position: relative;
    padding-top: 1.875rem;
    .datePicker-template {
      .flex(row,center,center);
      padding: .2rem 1rem;
      border:none;
      width: 100%;
      box-shadow: @boxShadow;
      background-color:white;
      border-radius: 1rem;
      img {
        width: 1.875rem;
        height: 1.875rem;
      }
      span {
        font-size: 1.125rem;
        color: @titleColor;
      }
    }
  }
}
</style>
