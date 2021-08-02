<template>
  <div class="dataDisplay">
    <v-echarts
      v-if="index !== -1"
      :option="echartOptions"
      class="chart"
    />
    <div
      v-else
      id="noData"
    >
      暂无数据
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import moment from 'moment'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, RadarChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  RadarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent
])

export default {
  name: 'InfoDisplayTemplateArea',
  components: {
    'v-echarts': ECharts
  },
  props: {
    healthItemAttr: {
      type: Object,
      default: () => ({})
    },
    recordData: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: -1
    },
    date: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      echartOptions: this.getEchartOptions()
    }
  },
  watch: {
    date (newval, oldval) {
      if (newval !== oldval) {
        this.echartOptions = this.getEchartOptions()
      }
    },
    recordData () {
      this.echartOptions = this.getEchartOptions()
    }
  },
  methods: {
    getEchartOptions () {
      const that = this
      const dataArray = (() => {
        const _arr = []
        if (this.index !== -1) {
          const sleepRate = parseInt(moment(this.recordData[this.index].data[1]).diff(moment(this.recordData[this.index].data[0]))) / (864000 / 2)
          _arr.push({
            name: '睡眠时间',
            value: sleepRate
          })
          _arr.push({
            name: '活动时间',
            value: 100 - sleepRate
          })
        } else {
          _arr.push({
            name: '活动时间',
            value: 100
          })
        }
        return _arr
      })()

      const startAngle = (() => {
        let _angle = 90
        if (this.index !== -1) {
          const todayStartTime = moment(this.recordData[this.index].data[0]).startOf('day')
          const duration = parseInt(moment(this.recordData[this.index].data[0]).diff(todayStartTime)) / (86400000 / 2)
          _angle += 360 - duration * 360
        }
        return _angle
      })()
      return {
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        radar: {
          indicator: [
            { name: '12', max: 1 },
            { name: '11', max: 1 },
            { name: '10', max: 1 },
            { name: '9', max: 1 },
            { name: '8', max: 1 },
            { name: '7', max: 1 },
            { name: '6', max: 1 },
            { name: '5', max: 1 },
            { name: '4', max: 1 },
            { name: '3', max: 1 },
            { name: '2', max: 1 },
            { name: '1', max: 1 }
          ],
          name: {
            textStyle: {
              color: '#54a5f3'
            }
          },
          shape: 'circle',
          splitNumber: 0,
          splitArea: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#54a5f3'
            }
          }
        },
        series: [
          {
            type: 'radar',
            data: [],
            symbol: 'none',
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
          {
            name: this.healthItemAttr.name + '图',
            type: 'pie',
            startAngle,
            radius: '80%',
            center: ['50%', '50%'],
            roseType: false,
            data: dataArray,
            label: {
              show: true,
              position: 'inside',
              color: 'rgb(255, 255, 255)',
              fontSize: 16
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#54a5f3'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            },
            tooltip: {
              position: 'bottom',
              borderColor: '#54a5f3',
              formatter: params => {
                console.log(params)
                if (params instanceof Array) params = params[0]
                const tipsArr = this.healthItemAttr.newRecordName
                const numArr = this.recordData[this.index].data
                const index = this.index
                return moment(that.recordData[index].createTime).format('YYYY-MM-DD HH:ss') + '<br />' + tipsArr.reduce((prev, cur, index, arr) => {
                  let str = cur + ': ' + numArr[index]
                  if (index < arr.length) {
                    str += '<br />'
                  }
                  prev += str
                  return prev
                }, '')
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.dataDisplay {
  width: 100%;
  padding-top: 1rem;
  .flex(column,center,center);
  .chart {
    width: 100%;
    height: 20rem;
  }
  #noData {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: @secondColor;
  }
}
</style>
