<template>
  <div class="header-container">
    <div id="title">
      {{ title }}
    </div>
    <div id="date">
      {{ createTime }}
    </div>
    <div
      id="return"
      @click="returnToPrescription"
    >
      <img
        :src="LeftArrow"
        alt="return"
      >
    </div>
  </div>
</template>

<script>
import LeftArrow from '_icon/left-arrow.png'
export default {
  name: 'PrescriptionDetailHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    LeftArrow
  }),
  methods: {
    returnToPrescription () {
      this.$router.replace({
        name: 'prescription'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.header-container{
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding: .4rem;
    .flex(column,center,center);
    background-color: white;
    border: none;
    box-shadow: @boxShadow;
    // border-radius: .3rem;
    #title{
        font-size: 1.2rem;
        color:@titleColor;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    #date{
        margin-top: .1rem;
        color: @postTitleColor;
    }
    #return{
        height: 100%;
        position: absolute;
        left: 1rem;
        .flex(row,center,center);
        img{
           width: 2rem;
        }
    }

}
</style>
