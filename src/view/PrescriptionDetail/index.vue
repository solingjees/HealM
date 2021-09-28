<template>
  <div class="prescription-detail-container">
    <prescription-detail-header
      v-if="Object.keys(prescriptionDetailData).length > 0"
      :title="prescriptionDetailData.title"
      :create-time="prescriptionDetailData.createTime"
    ></prescription-detail-header>
    <div class="body">
      <prescription-detail-tags
        v-if="Object.keys(prescriptionDetailData).length > 0"
        :list="tagList"
      ></prescription-detail-tags>
      <prescription-detail-proceed
        v-if="Object.keys(prescriptionDetailData).length > 0"
        :list="prescriptionDetailData.stage"
      ></prescription-detail-proceed>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
import Tags from './components/my-tags.vue'
import Proceed from './components/my-proceed.vue'
export default {
  name: 'PrescriptionDetail',
  components: {
    'prescription-detail-header': Header,
    'prescription-detail-tags': Tags,
    'prescription-detail-proceed': Proceed
  },
  props: {
    /**
     * 处方Id
     */
    pid: {
      type: String,
      default: ''
    },
    /**
     * 医生id
     */
    did: {
      type: String,
      default: ''
    },
    /**
     * 用户id
     */
    uid: {
      type: [String, Number],
      default: ''
    }
  },
  data: () => ({
    prescriptionDetailData: {}
  }),
  computed: {
    period () {
      if (this.prescriptionDetailData.period) {
        switch (this.prescriptionDetailData.period) {
          case 1:
            return '一天'
          case 3:
            return '三天'
          case 7:
            return '一周'
          case 15:
            return '半月(十五天)'
          case 30:
            return '一个月(三十天)'
          default:
            return '未知'
        }
      } else {
        return '未知'
      }
    },
    tagList () {
      return [{
        title: '医生:' + this.prescriptionDetailData.doctorName,
        color: '#2C8CF0'
      }, {
        title: '数据提交周期:' +
        this.period + '一次',
        color: '#F59A23'
      }, {
        title: '健康项:' + this.prescriptionDetailData.healthItemList.join(','),
        color: '#4B7902'
      }, {
        title: '可疑病症:' + this.prescriptionDetailData.possibleDisease,
        color: 'error'
      }]
    }
  },
  mounted () {
    this.getPrescriptionDetail()
  },
  methods: {
    async getPrescriptionDetail () {
      const res = await this.$axios.home.getPrescriptionDetail({
        userId: parseInt(this.uid),
        doctorId: parseInt(this.did)
      })
      if (res.status) {
        this.prescriptionDetailData = res.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.prescription-detail-container{
  width: 100%;
  box-sizing: border-box;
  .body{
    padding: .5rem 1rem;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
