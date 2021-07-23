<template>
  <div
    v-if="Object.keys(statisticsData).length > 0"
    class="statistics-wrapper"
  >
    <div id="title">
      {{ require('moment')(statisticsData.startTime).format('YYYY/MM/DD') }} —
      {{ require('moment')(statisticsData.endTime).format('YYYY/MM/DD') }}
    </div>
    <div id="chart">
      <!-- 折线图 -->
      <line-chart
        v-if="statisticsData.type === 1"
        :health-item-attr="healthItem"
        :record-data="allRecordData"
        :start-time="statisticsData.startTime"
        :end-time="statisticsData.endTime"
      />
      <!-- 区域图 -->
      <area-chart
        v-if="statisticsData.type === 2"
        :health-item-attr="healthItem"
        :record-data="allRecordData"
        :start-time="statisticsData.startTime"
        :end-time="statisticsData.endTime"
      />
    </div>
    <StatisticsDataCard
      :data-list="statisticsData.statisticsName"
    />
  </div>
</template>

<script>
import StatisticsDataCard from './statisticsDataCard.vue'
import { getHealthStatisticsData } from '_api/home'
import LineChart from './displayTemplates/line.vue'
import AreaChart from './displayTemplates/area.vue'

export default {
  name: 'Statistics',
  components: {
    'line-chart': LineChart,
    'area-chart': AreaChart,
    StatisticsDataCard
  },
  props: {
    userId: {
      type: [Number, String],
      default: ''
    },
    healthItemId: {
      type: [Number, String],
      default: ''
    },
    healthItem: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      statisticsData: {},
      allRecordData: {}
    }
  },
  watch: {
    async healthItem () {
      if (Object.keys(this.healthItem).length === 0) return
      if (!this.healthItem.statistics) {
        // 该健康项没有统计数据，则直接重定向到信息页面
        this.$router.replace({
          name: 'info',
          query: this.$route.query
        })
      } else {
        await this._getHealthStatisticsData()
      }
    }
  },
  async mounted () {
    if (Object.keys(this.healthItem).length > 0) {
      await this._getHealthStatisticsData()
    }
  },
  methods: {
    // 获取
    async _getHealthStatisticsData () {
      const res = await getHealthStatisticsData({
        userId: this.userId,
        healthItemId: this.healthItemId
      })
      if (res.status) {
        const data = res.data
        this.statisticsData = data.statisticsData
        this.allRecordData = data.allRecordData
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.statistics-wrapper {
  width: 100%;
  .flex(column,center,center);
  #title {
    font-size: 1rem;
    color: @titleColor;
    margin-top: 2rem;
  }
  #chart {
    width: 100%;
    height: 20rem;
  }
}
</style>
