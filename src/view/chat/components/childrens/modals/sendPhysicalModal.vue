<template>
  <Modal
    :value="isOpenSendPhysicalModal"
    title="请选择体检报告"
    :loading="true"
    @on-ok="handleOk"
    @on-cancel="handleChangeModal"
    @on-visible-change="handleSendPhysicalModalVisibleChange"
  >
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
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
    <div
      style="border-top: 1px solid #e9e9e9;padding-top:6px;margin-top:6px;"
      class="dataList"
    >
      <CardFolder
        v-if="recordData.length > 0"
        class="card-folder"
        :card-height="300"
        :data-list="recordData"
        :index="0"
      >
        <template
          v-slot="{ index: innerIndex, data}"
        >
          <div class="container">
            <div class="title">
              第{{ innerIndex + 1 }}张图片
            </div>
            <hr>
            <div class="body">
              <img
                :src="data"
                :alt="'第'+ (innerIndex + 1)+'张图片'"
              >
            </div>
          </div>
        </template>
      </cardfolder>
      <div v-else>
        暂无数据
      </div>
    </div>
  </Modal>
</template>

<script>

import DownArrowIcon from '_icon/downArrow.png'
import CardFolder from '@/components/CardFolder'
import moment from 'moment'
export default {
  name: 'SendHealthItemModal',
  components: {
    CardFolder
  },
  props: {
    isOpenSendPhysicalModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openSelectDate: false,
      DownArrowIcon,
      healthItemAttr: {},
      recordData: [],
      date: moment().format('YYYY-MM-DD')
    }
  },
  watch: {
    date () {
      this._getPhysicalData()
    }
  },
  methods: {
    async _getPhysicalData () {
      const res = await this.$axios.user.getPhysicalData({
        date: this.date
      })
      this.recordData = res.data.picture ? res.data.picture : []
    },
    handleChangeModal () {
      this.$emit('change', !this.isOpenSendPhysicalModal)
    },
    handleOk () {
      // 发送数据
      this.$emit('send', {
        dataList: this.recordData,
        date: this.date
      })
      this.handleChangeModal()
    },
    openSendHealthItemModal () {
      this.isOpenSendHealthItemModal = true
    },
    async  handleSendPhysicalModalVisibleChange () {
      if (this.isOpenSendPhysicalModal) {
        this._getPhysicalData()
      }
    },
    handleOK () {
      this.openSelectDate = false
    },
    handleChange (date) {
      this.openSelectDate = false
      this.date = date
    },
    handleClear () {
      this.openSelectDate = false
    },
    handleClickTransformDate () {
      this.openSelectDate = !this.openSelectDate
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.checkBox{
    // display: block;
    margin: .5rem;
}
.datePicker-template {
      .flex(row,center,center);
      padding: .2rem 1rem .2rem 0rem;
      border:none;
      width: 100%;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      span {
        font-size: 1rem;
        color: @titleColor;
      }
}
.dataList{
  .title{
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
