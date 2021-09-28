<template>
  <div class="prescription-wrapper">
    <!-- <div
      v-if="haveUnpostHealthItem"
      class="tips"
    >
      <span>提醒:</span>今日有相关健康数据未填写。
    </div> -->
    <PrescriptionClass
      v-if="runningPrescriptionList.length > 0"
      title="进行中"
      title-color="#4B7902"
      :prescription-list="runningPrescriptionList"
    ></PrescriptionClass>
    <PrescriptionClass
      v-if="finishedPrescriptionList.length > 0"
      title="已完成"
      :is-end="true"
      title-color="#2C8CF0"
      :prescription-list="finishedPrescriptionList"
    ></PrescriptionClass>
    <PrescriptionClass
      v-if="cancelledPrescriptionList.length > 0"
      title="已取消"
      title-color="#D9001B"
      :is-end="true"
      :prescription-list="cancelledPrescriptionList"
    ></PrescriptionClass>
    <div
      v-if="prescriptionList.length === 0"
      class="noData"
    >
      暂无医生开出处方
    </div>
  </div>
</template>

<script>
import PrescriptionClass from './components/PrescriptionClass.vue'
export default {
  name: 'Prescription',
  components: {
    PrescriptionClass
  },
  data: () => ({
    prescriptionList: []
  }),
  computed: {
    runningPrescriptionList () {
      return this.filterPrescriptionByState(1)
    },
    cancelledPrescriptionList () {
      return this.filterPrescriptionByState(2)
    },
    finishedPrescriptionList () {
      return this.filterPrescriptionByState(0)
    },
    haveUnpostHealthItem () {
      return this.runningPrescriptionList.filter(
        prescriptionListItem => prescriptionListItem.notUploadHealthItem.length > 0)
        .length > 0
    }
  },
  mounted () {
    this._getPrescriptionList()
  },
  methods: {
    async _getPrescriptionList () {
      const res = await this.$axios.user.getPrescriptionList()
      if (res.status) {
        this.prescriptionList = res.data
      }
    },
    filterPrescriptionByState (state) {
      return this.prescriptionList.filter(prescriptionItem => parseInt(prescriptionItem.state) === parseInt(state))
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.prescription-wrapper{
  width:100%;
  box-sizing: border-box;
  padding: 0px 1.5rem;
  .tips{
    width: 100%;
    height: fit-content;
    background-color: white;
    box-sizing: border-box;
    padding: .6rem;
    border-radius: 1rem;
    border:none;
    box-shadow: @boxShadow;
    margin-top: 1rem;
    span{
      color:#F59A23;
    }
  }
  .noData{
    width: 100%;
    text-align: center;
    margin-top: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #cdcdcd;
  }
}
</style>
