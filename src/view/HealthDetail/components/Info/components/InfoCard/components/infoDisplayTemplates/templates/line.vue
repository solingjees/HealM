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
import { LineChart } from 'echarts/charts'
import {
  // TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  // TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
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
        return this.recordData.reduce(function (prev, cur, index, arr) {
          prev.push([cur.createTime, ...cur.data])
          return prev
        }, [])
      })()
      return {
        tooltip: {
          borderColor: '#54a5f3',
          formatter: params => {
            if (params instanceof Array) params = params[0]
            const tipsArr = this.healthItemAttr.newRecordName
            const numArr = params.data
            const index = params.dataIndex
            return moment(that.recordData[index].createTime).format('YYYY-MM-DD HH:ss') + '<br />' + tipsArr.reduce((prev, cur, index, arr) => {
              let str = cur + ': ' + numArr[index + 1]
              if (index < arr.length) {
                str += '<br />'
              }
              prev += str
              return prev
            }, '')
          }
        },
        xAxis: {
          name: '时间',
          nameLocation: 'middle',
          nameTextStyle: {
            padding: 10
          },
          scale: true,
          type: 'time',
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 1,
          boundaryGap: ['5%', '5%'],
          axisLabel: {
            rotate: 0,
            align: 'center'
          },
          axisPointer: {
            snap: true,
            lineStyle: {
              color: '#54a5f3',
              width: 2
            },
            label: {
              show: true,
              formatter: function (params) {
                return moment(params.value).format('YYYY-MM-DD HH:mm')
              },
              backgroundColor: '#54a5f3'
            },
            handle: {
              show: true,
              color: '#54a5f3'
            }
          }
        },
        grid: {
          left: '45',
          right: '10',
          bottom: '75',
          containLabel: false
        },
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0]
          }
        ],
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          },
          name: `${this.healthItemAttr.name}(${this.healthItemAttr.unit})`
        },
        series: [
          {
            name: this.healthItemAttr.name + '表',
            type: 'line',
            barWidth: '20rem',
            data: dataArray,
            dimensions: [],
            lineStyle: {
              color: '#54a5f3'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
