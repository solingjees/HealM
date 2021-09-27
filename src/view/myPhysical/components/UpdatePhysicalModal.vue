<template>
  <Modal
    :v-model="isShow"
    title="Common Modal dialog box title"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <p>Content of dialog</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>
</template>

<script>
export default {
  name: 'UpdatePhysicalModal',
  model: {
    prop: 'isShow',
    event: 'change'
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
