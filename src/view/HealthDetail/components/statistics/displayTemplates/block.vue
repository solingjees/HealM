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
import { BarChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
])

export default {
  name: 'InfoDisplayTemplateBlock',
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
    getEchartOptions () {
      const that = this
      const dataArray = (() => {
        // 检测类别
        if (this.healthItemAttr.newRecordName.length === 2 && this.healthItemAttr.unit === '无') {
          // 数据由两个数据进行差值计算得出，没有单位说明是时间数据
          return this.recordData.reduce(function (prev, cur, index, arr) {
            const time0 = moment(cur.data[0])
            const time1 = moment(cur.data[1])
            const duration = Math.abs(time0.diff(time1)) // 计算时间差值
            prev.push([cur.createTime, duration])
            return prev
          }, [])
        } else {
          // 数据由两个数据进行差值计算得出，没有单位说明是时间数据
          return this.recordData.reduce(function (prev, cur, index, arr) {
            prev.push([cur.createTime, cur.data[0]])
            return prev
          }, [])
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
            }, '') +
             // 如果有两个数据，并且没有单位，说明是时间，求值
             (() => {
               if (that.healthItemAttr.newRecordName.length === 2 && that.healthItemAttr.unit === '无') {
                 const duration = moment.duration(params.data[1])
                 return '共睡眠' + duration.hours() + '时' + duration.minutes() + '分'
               } else {
                 return ''
               }
             })()
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
          left: '50',
          right: '23',
          bottom: '100',
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
          axisLabel: {
            formatter (value, index) {
              if (that.healthItemAttr.newRecordName.length === 2 && that.healthItemAttr.unit === '无') {
                return moment.duration(value).locale('zh-cn').humanize()
              }
            }
          },
          type: 'value',
          name: `${this.healthItemAttr.name}` + (this.healthItemAttr.unit === '' || this.healthItemAttr.unit === '无' ? '' : '(' + this.healthItemAttr.unit + ')')
        },
        series: [
          {
            name: this.healthItemAttr.name + '表',
            type: 'bar',
            barWidth: '20rem',
            data: dataArray,
            label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                if (this.healthItemAttr.newRecordName.length === 2 && this.healthItemAttr.unit === '无') {
                  const duration = moment.duration(params.data[1])
                  return duration.hours() + '时' + duration.minutes() + '分'
                }
              }
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
