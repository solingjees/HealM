<template>
  <Modal
    :value="isOpenCompleteContractModal"
    title="结束签约"
    :loading="true"
    @on-ok="handleOk"
    @on-cancel="handleChangeModal"
  >
    <p>您确定要结束和{{ $store.state.user.identity === 0? '医生':'病人' }}【{{ $route.query.name }}】的签约吗？</p>
  </Modal>
</template>

<script>
export default {
  name: 'CompleteContractModal',
  props: {
    isOpenCompleteContractModal: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: -1
    },
    doctorId: {
      type: Number,
      default: -1
    }
  },
  methods: {
    handleChangeModal () {
      this.$emit('change', !this.isOpenCompleteContractModal)
    },
    async handleOk () {
      const res = await this.$axios.home.completeContract({
        userId: this.userId,
        doctorId: this.doctorId
      })
      if (res.status) {
        this.$Message.success(res.script)
        this.handleChangeModal()
      } else {
        this.$Message.error(res.script)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';

</style>
