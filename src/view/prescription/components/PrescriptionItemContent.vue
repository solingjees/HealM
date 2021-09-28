<template>
  <div class="item-content-container">
    <div class="item">
      <div class="left">
        <Badge :color="badgeColor" />处方名
      </div>
      <div class="right">
        {{ data.title }}
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Badge :color="badgeColor" />网诊
      </div>
      <div class="right">
        {{ data.possibleDisease }}
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Badge :color="badgeColor" />医生
      </div>
      <div class="right">
        {{ data.doctorName }}
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Badge :color="badgeColor" />要求健康项
      </div>
      <div class="right">
        {{ data.notUploadHealthItem.length > 0? data.notUploadHealthItem.join(',') : '无' }}
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Badge :color="badgeColor" />状态
      </div>
      <div class="right">
        <template v-if=" data.state === 1">
          <span style="color:#4B7902">进行中</span>
        </template>
        <template v-if=" data.state === 0">
          <span style="color:#2C8CF0">已完成</span>
        </template>
        <template v-if=" data.state === 2">
          <span style="color:#D9001B">已取消</span>
        </template>
      </div>
    </div>
    <div class="item">
      <div class="left">
        <Badge :color="badgeColor" />创建时间
      </div>
      <div class="right">
        {{ require('moment')(data.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionItemContent',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    badgeColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='less' scoped>
@import '~/src/index.less';
.item-content-container{
    width: 100%;
    .item{
        line-height: 2rem;
        width: 100%;
        .flex(row,space-between,center);
        .left{
            white-space: nowrap;
        }
        .right{
            margin-left: 1rem;
        }
    }
}
</style>
