<template>
  <div class="prescription-detail-proceed-container">
    <Card
      v-for="(stageItem,index) in list"
      :key="'stage-item-'+index"
      class="card"
    >
      <div
        slot="title"
        class="title"
      >
        <div class="left">
          {{ stageItem.title }}
        </div>
        <div>{{ require('moment')(stageItem.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
      <p class="content">
        {{ stageItem.content }}
      </p>
      <div class="badge">
        <img
          v-if="!stageItem.deleteTime"
          :src="RunningIcon"
          alt="running"
        >
        <img
          v-else
          :src="FinishedIcon"
          alt="finished"
        >
      </div>
    </Card>
  </div>
</template>

<script>
import FinishedIcon from '_icon/finished.png'
import RunningIcon from '_icon/running.png'
export default {
  name: 'PrescriptionDetailProceed',
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    FinishedIcon, RunningIcon
  })
}
</script>

<style lang="less">
@import '~/src/index.less';
.prescription-detail-proceed-container{
    width: 100%;
    .card{
        margin-top: .5rem;
        border-radius: .3rem;
        border:none;
        box-shadow: @boxShadow;
        .title{
          .flex(row,space-between,ceter);
          .left{
            font-weight: bold;
          }
        }
        .content{
          min-height: 5rem;
          padding-right: 2rem;
        }

    }
    .ivu-card-body{
      position: relative;
      padding: .5rem 1rem;
      .badge{
          position: absolute;
          right: -1rem;
          top: 0rem;
          img{
            width: 6rem;
          }
      }
    }
    .ivu-card-head{
      padding: .5rem 1rem;
    }
}
</style>
