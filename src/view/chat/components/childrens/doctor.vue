<template>
  <div class="function-container">
    <TagGroup
      :tag-list="tagList"
      :message-list="messageList"
      :initial-time-delay-list="[0]"
      @tagClick="handleTagClick"
    />
    <CompleteContractModal
      :is-open-complete-contract-modal="isOpenCompleteContractModal"
      :doctor-id="$store.state.user.id"
      :user-id="opponentId"
      @change="handleChangeCompleteContractModal"
    />
  </div>
</template>

<script>
import CompleteContractModal from './modals/completeContractModal.vue'
import TagGroup from './functionTagGroup.vue'
import BookIcon from '_icon/book.png'
import TrashIcon from '_icon/trash.png'
export default {
  name: 'ChatDoctorFunctionArea',
  components: {
    TagGroup,
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
  data: () => ({
    isOpenCompleteContractModal: false
  }),
  computed: {
    tagList () {
      let _tagList = []
      if (this.isAssigned) {
        _tagList = [{
          title: '编写处方',
          icon: BookIcon,
          timeDelay: 0,
          callback: this.handleEditPrescription
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
  methods: {
    handleTagClick ({ tagItem, index }) {
      tagItem.callback()
    },
    handleEditPrescription () {
      this.$router.push({
        name: 'edit-prescription',
        query: {
          userId: this.$route.query.opponentId,
          doctorId: this.$store.state.user.id,
          windowId: this.$route.query.id,
          name: this.$route.query.name
        }
      })
    },
    handleChangeCompleteContractModal (value = true) {
      this.isOpenCompleteContractModal = value
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
