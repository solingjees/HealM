<template>
  <div
    id="messageContent"
    class="content"
    @click="handleContentClick"
  >
    <template v-for="(messageItem,index) in messageList">
      <div
        v-if="JSON.parse(messageItem.content).type === 'cancelContract'"
        :key="'messageItem-'+index"
      >
      </div>
      <!-- 医生，并且是普platform的消息，不显示它 -->
      <div
        v-if="JSON.parse(messageItem.content).type === 'platform' && $store.state.user.identity === 1"
        :key="'messageItem-'+index"
      >
      </div>
      <div
        v-else
        :key="'messageItem-'+index"
        class="messageList"
      >
        <div
          v-if="index === 0 || require('moment')(messageList[index].createTime).format('YYYY-MM-DD') !==
            require('moment')(messageList[index - 1].createTime).format('YYYY-MM-DD')
            || ($store.state.user.identity === 1 && JSON.parse(messageList[index - 1].content).type === 'platform')
          "
          class="time"
        >
          {{ require('moment')(messageItem.createTime).format('YYYY-MM-DD') }}
        </div>
        <MyMessage
          :id="'messageItem'+index"
          :ref="'messageItem'+index"
          :message="messageItem"
          :window-id="windowId"
          :opponent-id="opponentId"
          :is-assigned="isAssigned"
        />
      </div>
    </template>
  </div>
</template>

<script>
import MyMessage from './MyMessage.vue'
import moment from 'moment'
export default {
  name: 'ChatContent',
  components: {
    MyMessage
  },
  props: {
    messageList: {
      type: Array,
      default: () => ([])
    },
    isAssigned: {
      type: Boolean,
      default: false
    },
    opponentId: {
      type: Number,
      default: -1
    },
    windowId: {
      type: Number,
      default: -1
    }
  },
  methods: {
    handleContentClick () {
      this.$emit('on-content-click')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.content{
    width: 100%;
    overflow: scroll;
    flex: 1;
    .messageList{
      .time{
        width: 100%;
        text-align: center;
        margin: .5rem 0rem 0rem 0rem;
        color: @postTitleColor;
      }
    }
}
</style>
