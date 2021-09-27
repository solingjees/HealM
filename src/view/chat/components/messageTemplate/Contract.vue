<template>
  <div class="contract-container">
    <div
      class="info"
    >
      {{ isISend? '您向医生发起签约请求':'病人向您发起签约请求' }}
      {{ activeRemainedTime > 0 && !message.cancelled && !message.received && !message.refused ? '('+ Math.ceil(activeRemainedTime / 1000) + ')' : '' }}
    </div>
    <div class="operate">
      <template v-if="message.cancelled">
        <Button
          type="error"
          disabled
          ghost
        >
          已取消
        </Button>
      </template>
      <template v-else-if="message.received">
        <Button
          type="success"
          ghost
        >
          已签约
        </Button>
      </template>
      <template v-else-if="message.refused">
        <Button
          ghost
          type="error"
        >
          已拒绝
        </Button>
      </template>
      <template v-else-if="isISend">
        <!-- 发出签约者 -->
        <template v-if="activeRemainedTime > 0">
          <!-- 没有过期 -->
          <Button
            type="error"
            @click="handlePatientCancelContract"
          >
            取消签约
          </Button>
        </template>
        <template v-else>
          <!-- 已经过期 -->
          <Button
            type="error"
            disabled
          >
            已过期
          </Button>
        </template>
      </template>
      <template v-else>
        <!-- 接收签约者 -->
        <template v-if="activeRemainedTime > 0 ">
          <Button
            type="primary"
            :style="{
              'margin-right':'0.5rem'
            }"
            @click="handleDoctorReceiveContract"
          >
            接受签约
          </Button>
          <Button
            type="error"
            @click="handleDoctorRefuseContract"
          >
            拒绝签约
          </Button>
        </template>
        <template v-else>
          <Button
            type="error"
            disabled
          >
            已过期
          </Button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Contract',
  props: {
    isISend: {
      type: Boolean,
      default: false
    },
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
  data () {
    return {
      activeRemainedTime: 0,
      clock: () => ({})
    }
  },
  computed: {
    messageData () {
      return JSON.parse(this.message.content).data
    }
  },
  watch: {
    activeRemainedTime (newval, oldval) {
      if (newval < 0) {
        clearInterval(this.clock)
      }
    }
  },
  mounted () {
    this.clock = setInterval(() => {
      this.activeRemainedTime = this.$config.contractActiveTime - moment().diff(moment(this.message.createTime))
    }, 1000)
  },
  methods: {
    sendMessage (data) {
      this.$socket.emit('sendMessage', {
        senderId: this.$store.state.user.id,
        receiveId: parseInt(this.opponentId),
        content: data,
        windowId: this.windowId
      })
    },
    handlePatientCancelContract () {
      // 取消签约
      this.sendMessage(JSON.stringify({
        type: 'cancelContract',
        data: this.messageData
      }))
    },
    handleDoctorReceiveContract () {
      // 发送签约请求到服务器
      this.$socket.emit('agreeContract', {
        userId: this.opponentId,
        doctorId: this.$store.state.user.id
      })
      // this.$socket.emit('commitContract', {
      //   userId: this.opponentId,
      //   doctorId: this.$store.state.user.id
      // })
      // 发送已经接受签约的消息
      this.sendMessage(JSON.stringify({
        type: 'receiveContract',
        data: this.messageData
      }))
    },
    handleDoctorRefuseContract () {
      // 接受签约
      this.sendMessage(JSON.stringify({
        type: 'refuseContract',
        data: this.messageData
      }))
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.contract-container{
  max-width: 70vw;
  box-sizing: border-box;
  padding: .5rem;
  .info{
    width: 100%;
    margin-bottom: .3rem;
    font-weight: bold;
  }
  .operate{
    width: 100%;
    box-sizing: border-box;
    .flex(row,space-between,center);
  }
}
</style>
