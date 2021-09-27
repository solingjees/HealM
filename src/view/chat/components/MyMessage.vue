<template>
  <div
    class="my-message-container"
    :style="{
      'flex-direction': isISend ? 'row-reverse':'row'
    }"
  >
    <template v-if="messageType !== 'platform'">
      <div
        class="avatar"
      >
        <img
          :src="message.avatar"
          alt="avatar"
        >
      </div>
      <div
        class="message"
        :class="{
          me: isISend && messageType === 'info'
        }"
      >
        <template v-if="messageType === 'info'">
          {{ messageData }}
        </template>
        <template v-if="messageType === 'contract'">
          <ContractTemplate
            :message="message"
            :is-i-send="isISend"
            :is-assigned="isAssigned"
            :opponent-id="opponentId"
            :window-id="windowId"
          ></ContractTemplate>
        </template>
        <template v-if="messageType === 'healthItemList'">
          <HealthItemTemplate
            :message="message"
            :is-i-send="isISend"
            :is-assigned="isAssigned"
            :opponent-id="opponentId"
            :window-id="windowId"
          >
          </HealthItemTemplate>
        </template>
        <template v-if="messageType === 'physical'">
          <PhysicalTemplate
            :message="message"
            :is-i-send="isISend"
            :is-assigned="isAssigned"
            :opponent-id="opponentId"
            :window-id="windowId"
          >
          </PhysicalTemplate>
        </template>
      </div>
    </template>
    <template v-if="messageType ==='platform' && isIRecieved">
      <div
        class="platform-info"
      >
        {{ messageData }}
      </div>
    </template>
  </div>
</template>

<script>
import ContractTemplate from './messageTemplate/Contract.vue'
import HealthItemTemplate from './messageTemplate/HealthItem.vue'
import PhysicalTemplate from './messageTemplate/Physical.vue'
export default {
  name: 'MyMessage',
  components: {
    ContractTemplate,
    HealthItemTemplate,
    PhysicalTemplate
  },
  props: {
    message: {
      type: Object,
      default: () => ({})
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
  computed: {
    myIdentity () {
      return this.$store.state.user.identity
    },
    myId () {
      return this.$store.state.user.id
    },
    isISend () {
      return this.message.senderId === this.myId && this.message.senderIdentity === this.myIdentity
    },
    isIRecieved () {
      return this.message.receiveId === this.myId && this.message.receiveIdentity === this.myIdentity
    },
    messageType () {
      let type = ''
      try {
        type = JSON.parse(this.message.content).type
      } catch {
        type = 'platform'
      }
      return type
    },
    messageData () {
      let data = ''
      try {
        data = JSON.parse(this.message.content).data
      } catch {
        data = this.message.content
      }
      return data
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.my-message-container{
  padding: .5rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display:flex;
  flex-direction: row;
  text-align: flex-start;
  justify-content: flex-start;
  .avatar{
    width: 3rem;
    height: 3rem;
    border-radius: .5rem;
    overflow: hidden;
    margin: .3rem;
    img{
       width: 100%;
    }
  }
  .message{
    max-width: 70%;
    margin-top: .4rem;
    box-shadow: @boxShadow;
    display: block;
    background-color: white;
    border-radius: .5rem;
    box-sizing: border-box;
    padding: .5rem;
    height: fit-content;
    &.me{
      background-color: @themeColor;
      color: white;
   }
  }
  .platform-info{
        width: 100%;
        text-align: center;
        margin: .5rem;
        color: @postTitleColor;
  }
}
</style>
