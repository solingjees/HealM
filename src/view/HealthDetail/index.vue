<template>
  <div class="health-detail-wrapper">
    <health-detail-header
      :health-item="healthDetailData.itemData"
      :health-item-id="healthItemId"
      :user-id="userId"
      @on-add="add"
    />
    <router-view
      :user-id="userId"
      :health-item-id="healthItemId"
      :health-item="healthDetailData.itemData"
      :date="date"
      :health-detail-data="healthDetailData"
      @on-change-date="changeDate"
      @on-change-health-record="changeHealthRecord"
      @on-delete-health-record="deleteHealthRecord"
    />
    <Modal
      v-if="healthDetailData && healthDetailData.itemData"
      v-model="showModal"
      :title="'添加' + healthDetailData.itemData.name || ''"
      :loading="loading"
      @on-ok="submit"
    >
      <input-item
        title="时间"
        type="time"
        @on-change-value="(value) => changeValue('date', value)"
      />
      <input-item
        v-for="(item, index) in healthDetailData.itemData.newRecordName"
        :key="'input-item-' + index"
        :title="item"
        :upload-limit="3"
        :type="inputType"
        @on-change-value="(value) => changeValue('data', value, index)"
      >
        <div
          v-if="
            healthDetailData.itemData.unit &&
              healthDetailData.itemData.unit !== '无'
          "
          class="append"
        >
          {{ healthDetailData.itemData.unit }}
        </div>
      </input-item>
    </Modal>
  </div>
</template>

<script>
import HealthDetailHeader from './components/header'
import InputItem from '@/components/inputItem'
import { addHealthDetailData } from '@/api/user'
import moment from 'moment'
export default {
  name: 'HealthDetail',
  components: {
    HealthDetailHeader,
    InputItem
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
    initDate: {
      type: String,
      default: ''
    },
    edit: {
      type: [String, Number],
      default: 0
    }
  },
  data: () => ({
    showModal: false,
    loading: true,
    addDataTemplate: {
      date: '',
      data: []
    },
    healthDetailData: {},
    date: ''
  }),
  computed: {
    inputType () {
      //  dataType:1, //0表示float，1代表datetime，2表示picture
      switch (this.dataType) {
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
    dataType () {
      return this.healthDetailData.itemData ? parseInt(this.healthDetailData.itemData.dataType) : 0
    }
  },
  async mounted () {
    if (this.initDate) {
      this.date = moment(this.initDate).format('YYYY-MM-DD')
    } else {
      this.date = moment().format('YYYY-MM-DD')
    }
    await this._getHealthDetailData(this.date, this.edit)
    this.addDataTemplate.data = new Array(
      this.healthDetailData.itemData.newRecordName.length
    )
  },
  methods: {
    async submit () {
      const postData = {
        ...this.addDataTemplate,
        healthItemId: parseInt(this.healthItemId)
      }
      postData.date = this.addDataTemplate.date
      // if (this.addDataTemplate.data instanceof Array) {
      //   postData.data = this.addDataTemplate.data[0]
      // } else {
      postData.data = this.addDataTemplate.data
      // }
      const res = await addHealthDetailData(postData)
      if (res.status) {
        this.showModal = false
        this.date = moment(this.addDataTemplate.date).format('YYYY-MM-DD')
        await this._getHealthDetailData(this.addDataTemplate.date)
      } else {
        this.$Message.error(res.script)
        this.loading = false
        setTimeout(() => {
          this.loading = true
        }, 500)
      }
    },
    add () {
      this.showModal = true
    },
    changeValue (key, value, index) {
      console.log(key, value)
      if (!(this.addDataTemplate[key] instanceof Array)) {
        this.addDataTemplate[key] = value
      } else {
        if (this.inputType === 'image') {
          this.addDataTemplate[key] = value
          return
        }
        this.addDataTemplate[key][index] = value
      }
    },
    async _getHealthDetailData (date, showModal = 0) {
      const res = await this.$axios.home.getHealthDetailData({
        healthItemIds: [parseInt(this.healthItemId)],
        date,
        userId: parseInt(this.userId)
      })
      if (res.status) {
        this.healthDetailData = (res.data)[0].detailData
        if (showModal) {
          this.showModal = true
        }
      } else {
        this.healthDetailData = {}
      }
    },
    changeDate (date) {
      this.date = date
      this._getHealthDetailData(date)
    },
    changeHealthRecord (data) {
      const index = data.index
      delete data.index
      const newRecordData = JSON.parse(JSON.stringify(this.healthDetailData.recordData))
      newRecordData[index] = data
      this.healthDetailData.recordData = newRecordData
    },
    deleteHealthRecord (index) {
      const newRecordData = JSON.parse(JSON.stringify(this.healthDetailData.recordData))
      newRecordData.splice(index, 1)
      this.healthDetailData.recordData = newRecordData
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.health-detail-wrapper {
  width: 100%;
}
.append {
  margin: 0px 10px;
}
</style>
