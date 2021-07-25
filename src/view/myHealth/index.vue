<template>
  <div class="myHealth-wrapper">
    <template v-for="healthItem in healthItemList">
      <health-item
        :key="'health-item-' + healthItem.healthItemId"
        :health-item="healthItem"
      />
    </template>
  </div>
</template>

<script>
import HealthItem from './components/healthItem.vue'
import moment from 'moment'
import Config from '@/config'
import { getHealthData } from '@/api/home'
export default {
  name: 'MyHealth',
  components: {
    HealthItem
  },
  data: () => ({
    healthItemList: []
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
    }
  }
}
</script>

<style lang="less" scoped>
.myHealth-wrapper {
  margin: 0.2rem;
  margin-top: 1rem;
}
</style>
