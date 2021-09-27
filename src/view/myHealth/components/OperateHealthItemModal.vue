<template>
  <Modal
    :value="isShow"
    title="提交新健康项"
    loading
    class="modal"
    scrollable
    @on-ok="ok"
    @on-cancel="cancel"
    @on-visible-change="change"
  >
    <p class="first">
      请选择健康项
    </p>
    <List
      border
    >
      <ListItem
        v-for="(item,index) in healthItemList"
        :key="'health-item-'+index"
      >
        <div
          class="list-item"
          @click="listItemClick(item,index)"
        >
          {{ item.name }}
        </div>
      </ListItem>
    </List>
  </Modal>
</template>

<script>
export default {
  name: 'OperateHealthItemModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    healthItemList: []
  }),
  methods: {
    ok () {
      this.$emit('on-change', false)
    },
    cancel () {
      this.$emit('on-change', false)
    },
    change (state) {
      if (state) {
        this._getHealthItem()
      }
    },
    listItemClick (item, index) {
      this.$router.push({
        name: 'healthDetail',
        query: {
          userId: this.$store.state.user.id,
          healthItemId: index + 1,
          edit: 1
        }
      })
    },
    async _getHealthItem () {
      const res = await this.$axios.user.getHealthItem()
      if (res.status) {
        this.healthItemList = res.data.itemList
      }
    }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
.modal{
    .first{
      margin-bottom: .5rem;
    }
}

.list-item{
    width: 100%;
    box-sizing: border-box;
    padding: .8rem;
    &:hover{
        color: white;
        background-color: @themeColor;
    }
}
.ivu-list-item{
    padding: 0rem !important;
}
</style>
