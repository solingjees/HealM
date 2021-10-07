<template>
  <div
    class="chat-container"
    :style="{
      height: 100 * vh - 50 + 'px'
    }"
  >
    <Header :name="name"></Header>
    <Content
      ref="messageContent"
      :window-id="windowId"
      :message-list="messages"
      :opponent-id="opponentId"
      :is-assigned="isAssigned"
      @on-content-click="handleContentClick"
    ></Content>
    <Operate-area
      :key="refreshKey"
      :reset="reset"
      :message-list="messages"
      :opponent-id="opponentId"
      :is-assigned="isAssigned"
      @onInputClick="handleInputClick"
      @sendMessage="sendMessage"
    ></Operate-area>
  </div>
</template>

<script>
import moment from 'moment'
import OperateArea from './components/OperateArea.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
export default {
  name: 'Chat',
  components: {
    Header,
    Content,
    OperateArea
  },
  props: {
    windowId: {
      type: Number,
      default: -1
    },
    name: {
      type: String,
      default: ''
    },
    opponentId: {
      type: Number,
      default: -1
    },
    isAssigned: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      reset: 0,
      refreshKey: 0,
      vh: window.innerHeight * 0.01,
      messages: []
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01
    })
    if (this.windowId && this.windowId !== -1) {
      // 说明该窗口存在
      setTimeout(() => {
        this.readMessages()
      }, 600)
      this.getAllMessages()
    }
  },
  methods: {
    handleInputClick () {
      const messageContent = document.getElementById('messageContent')
      setTimeout(() => {
        messageContent.scrollTo({
          left: 0,
          top: messageContent.scrollHeight,
          behavior: 'smooth'
        })
      }, 300)
    },
    handleContentClick () {
      this.reset += 1
    },
    readMessages () {
      // 如果窗口存在，那么已读所有消息
      this.$socket.emit('readMessage', {
        id: this.windowId
      })
    },
    async getAllMessages () {
      const res = await this.$axios.user.getAllChatMessages({
        windowId: this.windowId
      })
      if (res.status) {
        // 对message进行过滤操作
        const _messages = []
        for (const messageItem of res.data) {
          const getContractIndex = (dataContent) => {
            return _messages.findIndex(element => {
              const content = JSON.parse(element.content)
              return content.type === 'contract' && content.data === dataContent.data
            })
          }
          const messageItemContent = JSON.parse(messageItem.content)
          if (messageItemContent.type === 'cancelContract') {
            _messages[getContractIndex(messageItemContent)].cancelled = true
          } else if (messageItemContent.type === 'receiveContract') {
            this.key += 1
            _messages[getContractIndex(messageItemContent)].received = true
          } else if (messageItemContent.type === 'refuseContract') {
            _messages[getContractIndex(messageItemContent)].refused = true
          } else if (messageItemContent.type === 'getWindowId') {} else {
            _messages.push(messageItem)
          }
        }
        this.messages = _messages
        this.handleInputClick()
      }
    },
    sendMessage (data) {
      this.$socket.emit('sendMessage', {
        senderId: this.$store.state.user.id,
        receiveId: parseInt(this.opponentId),
        content: data,
        windowId: this.windowId
      })
      this.handleInputClick()
    },
    showHealthDataModal () {
      this.showHealthData = true
      this.showMoreOperate = false
    },
    showPhysicalModal () {
      this.showPhysical = true
      this.showMoreOperate = false
    }
  },
  sockets: {
    receiveMessage (data) {
      if (!this.windowId) {
        // 说明没有windowId之前
        this.windowId = this.$route.query.windowId = data.windowId
      }

      if (!data.avatar) {
        data.avatar = this.$store.state.user.avatar
      }

      const getContractIndex = (dataContent) => {
        const index = this.messages.findIndex(element => {
          const content = JSON.parse(element.content)
          return content.type === 'contract' && content.data === dataContent.data
        })
        return index
      }

      const dataContent = JSON.parse(data.content)

      if (dataContent.type === 'cancelContract') {
        const index = getContractIndex(dataContent)
        this.messages[index].cancelled = true
        return
      }
      if (dataContent.type === 'receiveContract') {
        const index = getContractIndex(dataContent)
        this.messages[index].received = true

        this.$router.replace({
          name: this.$route.name,
          query: {
            ...this.$route.query,
            isAssigned: true
          }
        })

        return
      }
      if (dataContent.type === 'refuseContract') {
        const index = getContractIndex(dataContent)
        this.messages[index].refused = true

        this.$router.replace({
          name: this.$route.name,
          query: {
            ...this.$route.query,
            isAssigned: false
          }
        })

        return
      }

      this.messages.push({
        ...data,
        createTime: typeof data.createTime === 'number' ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : data.createTime
      })

      // 已读消息
      if (data.receiveId === this.$store.state.user.id && data.receiveIdentity === this.$store.state.user.identity) {
        this.$socket.emit('readMessage', {
          id: this.windowId
        })
      }

      this.handleInputClick()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.chat-container{
    width: 100%;;
    .flex(column,space-between,center);
}

.modalTitle{
    font-size:@thirdSize;
}
.selectHealthItem{
    margin: 0.5em 0;
}
</style>
