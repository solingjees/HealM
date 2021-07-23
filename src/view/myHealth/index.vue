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
import HealthItem from './components/healthItem'
import moment from 'moment'
import { getHealthData } from '@/api/home'
export default {
  name: 'MyHealth',
  components: {
    HealthItem
  },
  data: () => ({
    healthItemList: [
      {
        healthItemId: 1,
        title: '体重',
        icon: 'weight',
        unit: '公斤',
        data: '',
        time: ''
      },
      {
        healthItemId: 2,
        title: '身高',
        icon: 'height',
        unit: '厘米',
        data: '',
        time: ''
      },
      {
        healthItemId: 3,
        title: '血压',
        icon: 'strength',
        unit: '毫米汞柱',
        data: '',
        time: ''
      },
      {
        healthItemId: 4,
        title: '血脂(总胆固醇)',
        icon: 'fat',
        unit: '毫摩尔/升',
        data: '',
        time: ''
      },
      {
        healthItemId: 5,
        title: '血糖',
        icon: 'surgar',
        unit: '毫摩尔/升',
        data: '',
        time: ''
      },
      {
        healthItemId: 6,
        title: '肺活量',
        icon: 'lung',
        unit: '毫升',
        data: '',
        time: ''
      },
      {
        healthItemId: 7,
        title: '睡眠',
        icon: 'sleep',
        unit: '',
        data: '',
        time: ''
      },
      {
        healthItemId: 8,
        title: '排泄物',
        icon: 'shit',
        isImage: true,
        data: '',
        time: ''
      },
      {
        healthItemId: 9,
        title: '皮肤病',
        icon: 'allergy',
        isImage: true,
        data: '',
        time: ''
      }
    ]
  }),
  mounted () {
    this._getHealthData()
  },
  methods: {
    async _getHealthData () {
      moment.locale('zh-cn')
      const res = await getHealthData()
      if (res.status) {
        const _itemData = res.data.itemData
        _itemData.map(item => {
          this.healthItemList.forEach(healthItem => {
            if (healthItem.title === item.name) {
              healthItem.data = item.data
              healthItem.isAssign = item.isAssign
              healthItem.time = moment(item.time).fromNow()
            }
          })
        })
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
