<template>
  <Modal
    :value="isShow"
    title="删除体检数据"
    :loading="loading"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    您确定删除第{{ index }}
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
    },
    index: {
      type: Number,
      default: -1
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
