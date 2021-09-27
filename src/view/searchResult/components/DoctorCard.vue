<template>
  <div
    class="doctor-card"
    @click="goToUserDescription"
  >
    <div class="left">
      <div class="avatar">
        <img
          :src="itemData.avatar"
          alt="avatar"
        >
        <div class="gender">
          <img
            v-if="itemData.gender === 1"
            :src="ManIcon"
            alt="man"
          >
          <img
            v-if="itemData.gender === 0"
            :src="WomanIcon"
            alt="woman"
          >
        </div>
      </div>
    </div>
    <div class="right">
      <div class="first-line">
        <div class="name">
          {{ itemData.name }}
        </div>
        <div class="position">
          {{ itemData.position }}
        </div>
      </div>
      <div class="second-line">
        <div class="hospital">
          {{ itemData.hospital }}
        </div>
        <div class="department">
          {{ itemData.department }}
        </div>
      </div>
      <div class="third-line">
        擅长: {{ itemData.skill }}
      </div>
      <div class="forth-line">
        <Button
          type="primary"
          shape="circle"
          @click.stop="goToUserDescription"
        >
          查看
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import ManIcon from '_icon/man.png'
import WomanIcon from '_icon/woman.png'
export default {
  name: 'DoctorCard',
  props: {
    itemData: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    ManIcon,
    WomanIcon
  }),
  methods: {
    goToUserDescription () {
      this.$router.push({
        name: 'doctorDescription',
        query: {
          id: this.itemData.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.doctor-card{
  width: 100%;
  box-sizing: border-box;
  padding: 1.2rem 1.2rem;
  background-color: white;
  border-bottom: 1px solid #efefef;
  .flex(row,flex-start,flex-start);
  .left{
     position: relative;
     .avatar{
       width: 3rem;
       height: 3rem;
       border-radius: 1.5rem;
       overflow: hidden;
       img{
           width:100%;
       }
     }
     .gender{
       position: absolute;
       top: 2rem;
       right:-0.5rem;
       width:1.5rem;
       img{
        width: 100%;
       }
     }
  }
  .right{
    @margin-left:.7rem;
    @margin-top:.5rem;
     margin-left: 1rem;
     flex: 1;
     .first-line{
       .flex(row,flex-start,center);
       .name{
          font-size: 1rem;
          font-weight: bold;
          color: @titleColor;
       }
       .position{
           margin-left: @margin-left;
       }
     }
     .second-line{
       margin-top: @margin-top;
       .flex(row,flex-start,center);
       .department{
           margin-left: @margin-left;
       }
     }
     .third-line{
       margin-top: @margin-top;
       color: @postTitleColor;
     }
     .forth-line{
       .flex(row,flex-end,center);
       margin-top: @margin-top;
       width: 100%;
     }
  }
}
</style>
