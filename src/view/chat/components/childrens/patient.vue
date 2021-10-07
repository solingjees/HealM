<template>
  <div class="function-container">
    <TagGroup
      :key="key"
      :tag-list="tagList"
      :message-list="messageList"
      :initial-time-delay-list="initialTimeDelayList"
      @tagClick="handleTagClick"
    />
    <SendHealthItemModal
      :is-open-send-health-item-modal="isOpenSendHealthItemModal"
      @change="handleChangeSendHealthItemModal"
      @send="sendHealthItem"
    />
    <SendPhysicalModal
      :is-open-send-physical-modal="isOpenSendPhysicalModal"
      @change="handleChangeSendPhysicalModal"
      @send="sendPhysical"
    />
    <CompleteContractModal
      :is-open-complete-contract-modal="isOpenCompleteContractModal"
      :user-id="$store.state.user.id"
      :doctor-id="opponentId"
      @change="handleChangeCompleteContractModal"
    />
  </div>
</template>

<script>

import SendHealthItemModal from './modals/sendHealthItemModal.vue'
import SendPhysicalModal from './modals/sendPhysicalModal.vue'
import CompleteContractModal from './modals/completeContractModal.vue'
import moment from 'moment'
import TagGroup from './functionTagGroup.vue'
import BookIcon from '_icon/book.png'
import TrashIcon from '_icon/trash.png'
import ShieldCrossIcon from '_icon/shield-cross.png'
import HeTongIcon from '_icon/hetong.png'
import DownArrowIcon from '_icon/downArrow.png'
export default {
  name: 'ChatPatientFunctionArea',
  components: {
    TagGroup,
    SendHealthItemModal,
    SendPhysicalModal,
    CompleteContractModal
  },
  props: {
    isAssigned: {
      type: Boolean,
      default: false
    },
    opponentId: {
      type: Number,
      default: -1
    },
    messageList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      key: 0,
      isOpenSendHealthItemModal: false,
      isOpenSendPhysicalModal: false,
      isOpenCompleteContractModal: false,
      sendHealthItemList: [],
      checkAllGroup: [],
      indeterminate: true,
      checkAll: false,
      openSelectDate: false,
      DownArrowIcon,
      date: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    initialTimeDelayList () {
      if (this.isAssigned) {
        return [0, 0, 0]
      }
      let initialContractDelayTime = 0
      const contractList = this.messageList.filter(messageItem => JSON.parse(messageItem.content).type === 'contract')
      if (contractList.length > 0) {
        const newestContract = contractList[contractList.length - 1]
        initialContractDelayTime = this.$config.contractActiveTime - moment().diff(moment(newestContract.createTime)) > 0
          ? this.$config.contractActiveTime - moment().diff(moment(newestContract.createTime)) : 0
      }
      return [initialContractDelayTime, 0, 0]
    },
    tagList () {
      let _tagList = [
      ]
      if (!this.isAssigned) {
        _tagList = [{
          title: '发起签约',
          icon: HeTongIcon,
          timeDelay: this.$config.contractActiveTime,
          callback: this.sendContract
        }]
      } else {
        _tagList = [{
          title: '发送健康项',
          icon: BookIcon,
          timeDelay: 0,
          callback: this.handleChangeSendHealthItemModal
        }, {
          title: '发送体检报告',
          icon: ShieldCrossIcon,
          timeDelay: 0,
          callback: this.handleChangeSendPhysicalModal
        }, {
          title: '结束签约',
          icon: TrashIcon,
          timeDelay: 0,
          callback: this.handleReleaseAssign
        }]
      }
      return _tagList
    }
  },
  watch: {
    isAssigned (newval, oldval) {
      if (newval !== oldval) {
        this.key++
      }
    }
  },
  methods: {
    handleTagClick ({ tagItem, index }) {
      tagItem.callback()
    },
    handleChangeSendHealthItemModal (value = true) {
      this.isOpenSendHealthItemModal = value
    },
    handleChangeSendPhysicalModal (value = true) {
      this.isOpenSendPhysicalModal = value
    },
    handleChangeCompleteContractModal (value = true) {
      this.isOpenCompleteContractModal = value
    },
    sendMessage (data) {
      this.$socket.emit('sendMessage', {
        senderId: this.$store.state.user.id,
        receiveId: parseInt(this.opponentId),
        content: data,
        windowId: this.windowId
      })
    },
    sendContract () {
      const data = JSON.stringify({
        type: 'contract',
        data: Math.ceil(Math.random() * 1000 + 1) // 签约单
      })
      this.sendMessage(data)
    },
    sendHealthItem (data) {
      this.$socket.emit('sendMessage', {
        senderId: this.$store.state.user.id,
        receiveId: parseInt(this.opponentId),
        content: JSON.stringify({
          type: 'healthItemList',
          data
        }),
        windowId: this.windowId
      })
    },
    sendPhysical (data) {
      this.$socket.emit('sendMessage', {
        senderId: this.$store.state.user.id,
        receiveId: parseInt(this.opponentId),
        content: JSON.stringify({
          type: 'physical',
          data
        }),
        windowId: this.windowId
      })
    },
    handleReleaseAssign () {
      this.isOpenCompleteContractModal = true
    }
  }
}
</script>

<style lang="less" scoped>
@import './common.less';
</style>
