<template>
  <div
    class="user-info-card-wrapper"
    :style="{
      'background-image': `url(${userInfo.avatar})`,
    }"
  >
    <div
      class="left-avatar"
      :style="{
        'background-image': `url(${userInfo.avatar})`,
      }"
    />
    <div class="right-wrapper">
      <div class="line1">
        <span class="name">{{ userInfo.name }}</span>/
        <div
          class="position"
        >
          {{ userInfo.position }}
        </div>
      </div>
      <div
        class="line2"
      >
        {{ userInfo.hospital }} {{ userInfo.department }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoCard',
  props: {
    userInfo: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.user-info-card-wrapper {
  width: 100%;
  height: 100px;
  background-size: 100%;
  position: relative;
  .flex(row,flex-start,center);
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .left-avatar {
    margin-left: 10px;
    z-index: 1;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .right-wrapper {
    z-index: 1;
    margin-left: 10px;
    .flex(column,center,flex-start);
    .line1 {
      .flex(row,center,center);
      .name {
        color: white;
        font-size: 20px;
      }
      .position {
        background-color: #f7f7f7;
        color: #808695;
        font-size: 4px;
        border: 1px solid #dcdee2;
        border-radius: 6px;
        padding: 2px 10px;
      }
      img {
        width: 25px;
        height: 25px;
      }
    }
    .line2 {
      margin-top: 5px;
      color: @secondColor;
      font-size: 14px;
    }
  }
}
</style>;
