<template>
  <div class="health-detail-header-wrapper">
    <div
      class="return"
      @click="goToBack"
    >
      <img
        :src="leftArrowIcon"
        alt="return"
      >
    </div>
    <div class="itemlist">
      <router-link
        :to="{
          name: 'info',
          query: {
            healthItemId,
            userId,
          },
        }"
        tag="div"
        replace
      >
        {{ healthItem.name || '暂无' }}
      </router-link>

      <router-link
        v-if="healthItem.statistics"
        :to="{
          name: 'statistics',
          query: {
            healthItemId,
            userId,
          },
        }"
        tag="div"
        replace
      >
        统计
      </router-link>
    </div>
    <div class="addBtn">
      <Button
        type="primary"
        @click="add"
      >
        添加
      </Button>
    </div>
  </div>
</template>

<script>
import LeftArrowIcon from '_icon/left-arrow.png'
export default {
  name: 'HealthDetailHeader',
  props: {
    healthItem: {
      type: Object,
      default: () => ({})
    },
    healthItemId: {
      type: [String, Number],
      default: ''
    },
    userId: {
      type: [String, Number],
      default: ''
    }
  },
  data: () => ({
    leftArrowIcon: LeftArrowIcon
  }),
  methods: {
    goToBack () {
      this.$router.back()
    },
    add () {
      this.$emit('on-add')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.health-detail-header-wrapper {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0px 20px 0px 10px;
  border-bottom: 1px solid @thirdColor;
  position: relative;
  .flex(row,space-between,center);
  .return {
    position: absolute;
    float: left;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .itemlist {
    flex: 1;
    box-sizing: border-box;
    padding: 0px 10px;
    .flex(row,center,center);
    div {
      color: @titleColor;
      font-size: 18px;
      text-align: center;
      width: 30%;
    }
  }
  .addBtn {
    position: absolute;
    right: 1rem;
  }
}
</style>
