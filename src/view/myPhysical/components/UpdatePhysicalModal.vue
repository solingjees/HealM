<template>
  <Modal
    :value="isShow"
    title="添加新体检数据"
    :loading="loading"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <input-item
      :upload-limit="1"
      :type="'image'"
      :value="[]"
      @on-change-value="changePicture"
    >
    </input-item>
  </Modal>
</template>

<script>
import InputItem from '@/components/inputItem'
export default {
  name: 'UpdatePhysicalModal',
  components: {
    InputItem
  },
  model: {
    prop: 'isShow',
    event: 'change'
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    newPicture: '',
    loading: true
  }),
  methods: {
    ok () {
      if (this.newPicture === '') {
        this.$Message.error('没有上传图片')
        this.loading = false
        setTimeout(() => {
          this.loading = true
        }, 500)
        return
      }
      this.$emit('add', this.newPicture)
      this.$emit('change', !this.isShow)
    },
    cancel () {
      this.$emit('change', !this.isShow)
    },
    changePicture (newPicture) {
      this.newPicture = newPicture
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
