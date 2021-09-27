<template>
  <div id="app">
    <van-notify
      v-model="showNotify"
      type="primary"
      background="rgba(255,255,255,.9)"
    >
      <div class="notify-body">
        <div class="avatar">
          <img
            :src="message.avatar"
            alt="avatar"
          />
        </div>
        <div class="message-body">
          <div class="name">
            [新消息]{{ message.name }}
          </div>
          <div class="content">
            {{ messageData }}
          </div>
        </div>
      </div>
    </van-notify>
    <router-view />
  </div>
</template>

<script>
import SocketMixin from '@/mixins/socket'
export default {
  name: 'App',
  mixins: [SocketMixin]
}
</script>

<style lang="less">
@import '~/src/index.less';
#app {
  html,
  body {
    width: 100%;
  }
}
.notify-body{
  box-sizing: border-box;
  padding: .3rem;
  width: 100%;
  .flex(row,flex-start,center);
  .avatar{
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .message-body{
     flex: 1;
     overflow: hidden;
     .flex(column,center,flex-start);
     padding-left: .6rem;
     box-sizing: border-box;
     .name{
        font-size: 1.1rem;
        color: @titleColor;
     }
     .content{
       max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: .3rem;
        margin-top:.2rem;
        color: @titleColor;
     }
  }
}
</style>
