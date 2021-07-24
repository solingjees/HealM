<template>
  <div class="dataDisplay">
    <v-echarts
      :option="echartOptions"
      class="chart"
    />
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import moment from 'moment'
import { CanvasRenderer } from 'echarts/renderers'
import { CandlestickChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  CandlestickChart,
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
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
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
    recordData () {
      this.echartOptions = this.getEchartOptions()
    }
  },
  methods: {
    testTime (string) {
      return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(string)
    },
    parseTimeArray (time1, time2) {
      const duration = moment.duration(moment(time2).diff(moment(time1))) // 获取毫秒差值
      const _data = []
      _data[0] = moment(time1).toArray()
      _data[0][0] = 1970
      _data[0][1] = 1
      _data[0][2] = 1
      const newTime1 = moment(_data[0]).format('YYYY-MM-DD HH:mm:ss')
      const newTime2 = moment(_data[0]).add(duration).format('YYYY-MM-DD HH:mm:ss')
      return [newTime1, newTime2]
    },
    getEchartOptions () {
      const that = this
      const dataArray = (() => {
        return this.recordData.reduce(function (prev, cur, index, arr) {
          if (cur.data.length === 2 && that.testTime(cur.data[0])) {
            // 属于时间
            const _data = that.parseTimeArray(...cur.data)
            prev.push([cur.createTime, ..._data, ..._data])
          } else {
            prev.push([cur.createTime, ...cur.data, ...cur.data])
          }
          return prev
        }, [])
      })()

      const yaxisType = (() => {
        if (this.recordData.length > 0 &&
       that.testTime(this.recordData[0].data[0])) {
          return 'time'
        } else {
          return 'value'
        }
      })()

      return {
        tooltip: {
          axisPointer: {
            type: 'line'
          },
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = { top: 60 }
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            return obj
          },
          borderColor: '#54a5f3',
          formatter: params => {
            if (params instanceof Array) {
              params = params[0]
            }
            const tipsArr = this.healthItemAttr.newRecordName
            const index = params.dataIndex
            return moment(that.recordData[index].createTime).format('YYYY-MM-DD HH:ss') + '<br />' + tipsArr.reduce((prev, cur, index2, arr) => {
              let str = cur + ': ' + that.recordData[index].data[index2]
              if (index2 < arr.length) {
                str += '<br />'
              }
              prev += str
              return prev
            }, '') + (that.recordData.length > 0 && that.recordData[0].data.length === 2
              ? (() => {
                const duration = moment.duration(moment(that.recordData[index].data[1]).diff(that.recordData[index].data[0]))
                const hours = duration.hours()
                const minutes = duration.minutes()
                return hours + '小时' + minutes + '分钟'
              })() : ''

            )
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
          axisLine: {
            onZero: false
          },
          splitLine: { show: true },
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
          type: yaxisType,
          name: `${this.healthItemAttr.name}` + (this.healthItemAttr.unit === '' || this.healthItemAttr.unit === '无' ? '' : '(' + this.healthItemAttr.unit + ')')
        },
        series: [
          {
            name: this.healthItemAttr.name + '表',
            type: 'candlestick',
            barWidth: '20rem',
            data: dataArray,
            dimensions: ['date', 'open', 'close', 'highest', 'lowest'],
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
