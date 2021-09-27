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
      <p>{{ stageItem.content }} </p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionDetailProceed',
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  }
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
    }
    .ivu-card-body{
      padding: .5rem 1rem;
    }
    .ivu-card-head{
      padding: .5rem 1rem;
    }
}
</style>
