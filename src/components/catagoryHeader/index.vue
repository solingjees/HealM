<template>
  <div class="catagory-header-container">
    <div class="left">
      <img
        class="icon"
        :src="icon"
        alt="标题"
      >
      <div class="title">
        {{ title }}
      </div>
      <Tooltip
        v-if="needTips"
        :content="toolTipsContent"
        theme="light"
        placement="bottom"
        max-width="100%"
      >
        <img
          class="tooltip"
          :src="InformationIcon"
          alt="tips"
        >
      </Tooltip>
    </div>
    <div class="right">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<script>
import InformationIcon from '_icon/information.png'
export default {
  name: 'CatagoryHeader',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    needTips: {
      type: Boolean,
      default: false
    },
    toolTipsContent: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    InformationIcon
  })
}
</script>

<style lang="less">
@import '~/src/index.less';
.catagory-header-container{
  width: 100%;
  margin: .5rem auto;
  .flex(row,space-between,center);
  .left{
     .flex(row,center,center);
     .icon{
         width: 2rem;
     }
     .title{
         font-size: 1.2rem;
         color:@titleColor;
         margin-left:.8rem;
     }
  }
  .right{

  }
}

.tooltip{
   width: 1.4rem;
   margin-left: .3rem;
}
</style>
