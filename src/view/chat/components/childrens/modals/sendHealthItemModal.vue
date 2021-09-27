<template>
  <Modal
    :value="isOpenSendHealthItemModal"
    title="请选择健康项"
    @on-ok="handleOk"
    @on-cancel="handleChangeModal"
    @on-visible-change="handleSendHealthItemModalVisibleChange"
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
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll"
      >
        全选
      </Checkbox>
    </div>
    <CheckboxGroup
      v-model="checkAllGroup"
      @on-change="checkAllGroupChange"
    >
      <Checkbox
        v-for="(item,index) in sendHealthItemList"
        :key="'send-health-item-'+index"
        class="checkBox"
        :label="index+1"
      >
        {{ item.name }}
      </Checkbox>
    </CheckboxGroup>
    <div
      style="border-top: 1px solid #e9e9e9;padding-top:6px;margin-top:6px;"
      class="dataList"
    >
      <template v-for="(item,index) in dataList">
        <div
          v-if="item.detailData.recordData.length > 0"
          :key="'data-item-title-'+index"
          class="title"
        >
          {{ item.detailData.itemData.name }}
        </div>
        <div
          :key="'data-item-body'+index"
          class="body"
        >
          <RecordItem
            v-for="(recordItem, index2) in item.detailData.recordData"
            :key="'data-item-body-record-'+index2"
            :disabled="true"
            :data-name-list="item.detailData.itemData.newRecordName || []"
            :data="recordItem"
            :type="getInputType(item.detailData.itemData.dataType)"
            :unit="item.detailData.itemData.unit"
          />
        </div>
      </template>
    </div>
  </Modal>
</template>

<script>
import RecordItem from '@/view/HealthDetail/components/Info/components/InfoRecord/components/recordItem.vue'
import DownArrowIcon from '_icon/downArrow.png'
import moment from 'moment'
export default {
  name: 'SendHealthItemModal',
  components: {
    RecordItem
  },
  props: {
    isOpenSendHealthItemModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sendHealthItemList: [],
      checkAllGroup: [],
      indeterminate: true,
      checkAll: false,
      openSelectDate: false,
      DownArrowIcon,
      date: moment().format('YYYY-MM-DD'),
      dataList: []
    }
  },
  watch: {
    checkAllGroup () {
      this._getHealthDetailData()
    },
    date () {
      this._getHealthDetailData()
    }
  },
  methods: {
    getInputType (dataType) {
      //  dataType:1, //0表示float，1代表datetime，2表示picture
      switch (dataType) {
        case 0:
          return 'line'
        case 1:
          return 'time'
        case 2:
          return 'image'
        default:
          return 'line'
      }
    },
    handleChangeModal () {
      this.$emit('change', !this.isOpenSendHealthItemModal)
    },
    handleOk () {
      // 发送数据
      this.$emit('send', {
        dataList: this.dataList,
        date: this.date
      })
      this.handleChangeModal()
    },
    openSendHealthItemModal () {
      this.isOpenSendHealthItemModal = true
    },
    async  handleSendHealthItemModalVisibleChange () {
      if (this.isOpenSendHealthItemModal) {
        // 发起请求获取健康项
        const res = await this.$axios.user.getHealthItem()
        if (res.status) {
          this.sendHealthItemList = res.data.itemList.filter(item => item.isSelect === true)
        }
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.checkAllGroup = this.sendHealthItemList.reduce((prev, cur, index) => {
          prev.push(index + 1)
          return prev
        }, [])
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.sendHealthItemList.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
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
    },
    async _getHealthDetailData () {
      if (this.checkAllGroup.length === 0) {
        this.dataList = []
        return
      }
      const res = await this.$axios.home.getHealthDetailData({
        healthItemIds: this.checkAllGroup,
        date: this.date,
        userId: this.$store.state.user.id
      })
      const _data = res.data
      _data.forEach(element => {
        element.detailData.recordData = element.detailData.recordData.filter(recordDataElement =>
          moment(recordDataElement.createTime).format('YYYY-MM-DD') === this.date
        )
      })
      this.dataList = _data
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
