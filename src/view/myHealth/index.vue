<template>
  <div class="myHealth-wrapper">
    <OperateHealthItemModal
      :is-show="isShowOperateHealthItemModal"
      @on-change="handleChangeShowOperateHealthItemModal"
    ></OperateHealthItemModal>
    <div class="first">
      <Button
        type="primary"
        class="button"
        @click="operateHealthItem"
      >
        提交新健康项
      </Button>
    </div>
    <template v-for="healthItem in healthItemList">
      <health-item
        :key="'health-item-' + healthItem.healthItemId"
        :health-item="healthItem"
      />
    </template>
    <div
      v-if="healthItemList.length === 0"
      class="noData"
    >
      点击按钮开始上传健康项
    </div>
  </div>
</template>

<script>
import HealthItem from './components/healthItem.vue'
import OperateHealthItemModal from './components/OperateHealthItemModal.vue'
import moment from 'moment'
import Config from '@/config'
import { getHealthData } from '@/api/home'
export default {
  name: 'MyHealth',
  components: {
    HealthItem,
    OperateHealthItemModal
  },
  data: () => ({
    healthItemList: [],
    isShowOperateHealthItemModal: false
  }),
  computed: {
    id () {
      return this.$store.state.user.id
    }
  },
  mounted () {
    this._getHealthData()
  },
  methods: {
    async _getHealthData () {
      moment.locale('zh-cn')
      const res = await getHealthData({
        userId: this.id
      })
      if (res.status) {
        const _itemData = res.data.itemData
        _itemData.forEach(element => {
          element.icon = Config.imageHeader + '/' + element.icon
        })
        this.healthItemList = _itemData
      }
    },
    operateHealthItem () {
      this.handleChangeShowOperateHealthItemModal()
    },
    handleChangeShowOperateHealthItemModal (value = true) {
      this.isShowOperateHealthItemModal = value
    }
  }
}
</script>

<style lang="less" scoped>
.myHealth-wrapper {
  margin: 0.2rem;
  margin-top: 1rem;
  .first{
    overflow: hidden;
    width:100%;
    margin-bottom: 1rem;
    .button{
      float: right;
      margin-right: 1rem;
    }
  }
   .noData{
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #cdcdcd;
  }
}
</style>
