<template>
  <Modal
    :value="isShow"
    title="删除体检数据"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    您确定删除第{{ index + 1 }}张体检图片?
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
  methods: {
    ok () {
      this.$emit('delete')
      this.$emit('change', !this.isShow)
    },
    cancel () {
      this.$emit('change', !this.isShow)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
