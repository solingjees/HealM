<template>
  <div class="info-wrapper">
    <InfoCard
      :health-item-id="healthItemId"
      :user-id="userId"
      :health-detail-data="healthDetailData"
      :date="date"
      :index="displayDataIndex"
      @on-change-date="changeDate"
    />
    <InfoRecord
      :health-detail-data="healthDetailData"
      :index="displayDataIndex"
      @on-change-health-record="changeHealthRecord"
      @on-delete-health-record="deleteHealthRecord"
    />
  </div>
</template>

<script>
import moment from 'moment'
import InfoCard from './components/InfoCard'
import InfoRecord from './components/InfoRecord'
export default {
  name: 'MyhealthInfo',
  components: {
    InfoCard,
    InfoRecord
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
    healthItem: {
      type: Object,
      default: () => ({})
    },
    date: {
      type: String
    },
    healthDetailData: {
      type: Object,
      default: () => ({})
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayDataIndex () {
      if (this.healthDetailData && this.healthDetailData.recordData) {
        return this.healthDetailData.recordData.findIndex(recordDataItem => {
          return moment(recordDataItem.createTime).format('YYYY-MM-DD') === moment(this.date).format('YYYY-MM-DD')
        })
      } else {
        return -1
      }
    }
  },
  methods: {
    changeDate (date) {
      // this.date = date
      this.$emit('on-change-date', date)
    },
    changeHealthRecord (data) {
      this.$emit('on-change-health-record', data)
    },
    deleteHealthRecord (index) {
      this.$emit('on-delete-health-record', index)
    }
  }
}
</script>

<style lang="less" scoped>
.info-wrapper {
  width: 100%;
}
</style>
