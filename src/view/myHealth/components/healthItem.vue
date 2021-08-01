<template>
  <div class="health-item-wrapper">
    <Card>
      <div slot="extra">
        <div
          v-if="healthItem.isAssign"
          class="tag"
        >
          医生要求
        </div>
      </div>
      <p slot="title">
        {{ healthItem.name }}
      </p>
      <div
        class="content"
        @click="goToHealthDetail"
      >
        <img
          :src="
            healthItem.icon
          "
          :alt="healthItem.name"
        >
        <div class="right">
          <div
            v-if="Object.keys(healthItem.data).length > 0"
            class="value"
          >
            <!-- 只有一个数据，而且数据不是图片 -->
            <template
              v-if="Object.keys(healthItem.data).length === 1 &&
                !/.*(\.png|\.jpg|\.jpeg|\.gif)$/.test(healthItem.data[Object.keys(healthItem.data)[0]])
              "
            >
              <span class="data">{{ healthItem.data[Object.keys(healthItem.data)[0]] }}</span>
              <span class="unit">{{ healthItem.unit }}</span>
            </template>
            <!-- 有两个数据，但是有单位 -->
            <template
              v-if="healthItem.unit !== '无' && Object.keys(healthItem.data).length >= 2"
            >
              <template
                v-for="(item,key) in healthItem.data"
              >
                <span
                  :key="key"
                  class="data"
                >{{ item + (Object.keys(healthItem.data)[Object.keys(healthItem.data).length - 1]
                  === key ? '' : '/') }}</span>
              </template>
              <span class="unit">{{ healthItem.unit }}</span>
            </template>
            <!-- 有两个数据，但是没有单位,数据本身需要转化成时间 -->
            <template
              v-if="healthItem.unit === '无' && Object.keys(healthItem.data).length === 2"
            >
              <template
                v-for="(value,index) in newHealthItem.data"
              >
                <span
                  :key="'health-item-data-'+ index"
                  class="data"
                >{{ value }}</span>
                <span
                  :key="'health-item-unit-'+index"
                  class="unit"
                >{{ index? '分':"时" }}</span>
              </template>
            </template>
            <!-- 有一个数据，并且该数据是图片 -->
            <template
              v-if="Object.keys(healthItem.data).length === 1
                && /.*(\.png|\.jpg|\.jpeg|\.gif)$/.test(healthItem.data[Object.keys(healthItem.data)[0]])
              "
            >
              <Avatar
                shape="square"
                :src="healthItem.data[Object.keys(healthItem.data)[0]]"
                size="large"
              />
            </template>
          </div>
          <div
            v-else
            class="data"
          >
            暂无数据
          </div>
          <div class="time">
            {{ healthItem.time || '无' }}
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'HealthItem',
  props: {
    healthItem: {
      type: Object,
      default: () => {}
    },
    userId: {
      type: String,
      default: ''
    }
  },
  computed: {
    newHealthItem (newval, oldval) {
      if (Object.keys(newval).length === 0) return {}
      // data是两个时间字符串的数组，额外处理
      const _newHealthItem = JSON.parse(JSON.stringify(this.healthItem))
      if (this.healthItem.unit === '无' && Object.keys(this.healthItem.data).length === 2) {
        const time1 = this.healthItem.data[Object.keys(this.healthItem.data)[0]]
        const time2 = this.healthItem.data[Object.keys(this.healthItem.data)[1]]
        const _duration = Math.abs(moment(time2).diff(time1))
        _newHealthItem.data = [
          moment.duration(_duration).hours(),
          moment.duration(_duration).minutes()
        ]
      }
      return _newHealthItem
    }
  },
  methods: {
    goToHealthDetail () {
      this.$router.push({
        name: 'healthDetail',
        query: {
          healthItemId: this.healthItem.healthItemId,
          userId: this.$store.state.user.id,
          initDate: moment(this.healthItem.time).format('YYYY-MM-DD')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.health-item-wrapper {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  padding: 0rem 0.2rem 0.5rem 0.2rem;
  .tag {
    font-size: 0.8rem;
    color: @themeColor;
  }
  .content {
    height: 5rem;
    .flex(row,space-between,center);
    img {
      width: 40px;
      height: 40px;
    }
  }
  .right {
    .flex(column,center,flex-end);
    .data {
      font-size: 20px;
      color: @titleColor;
    }
    .value {
      .data {
        font-size: 20px;
        color: @titleColor;
      }
      .unit {
        font-size: 15px;
        color: @titleColor;
      }
    }
    .time {
      margin-top: 5px;
      font-size: 14px;
      color: @secondColor;
    }
  }
}
</style>
