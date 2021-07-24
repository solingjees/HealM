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
        {{ healthItem.title }}
      </p>
      <div
        class="content"
        @click="goToHealthDetail"
      >
        <img
          :src="
            require('/src/assets/images/iconfont/' + healthItem.icon + '.png')
          "
          :alt="healthItem.title"
        >
        <div class="right">
          <div
            v-if="healthItem.data !== ''"
            class="value"
          >
            <template v-if="u1d1.includes(healthItem.title)">
              <span class="data">{{ healthItem.data }}</span>
              <span class="unit">{{ healthItem.unit }}</span>
            </template>
            <template v-else-if="u1d2.includes(healthItem.title)">
              <span
                class="data"
              >{{ newHealthItem.data[0] }}/{{ newHealthItem.data[1] }}</span>
              <span class="unit">{{ healthItem.unit }}</span>
            </template>
            <template v-else-if="time.includes(healthItem.title)">
              <span class="data">{{ newHealthItem.data[0] }}</span>
              <span class="unit">小时</span>
              <span class="data">{{ newHealthItem.data[1] }}</span>
              <span class="unit">分钟</span>
            </template>
            <template v-else-if="image.includes(healthItem.title)">
              <span class="data">[图片]</span>
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
  data: () => ({
    u1d1: ['体重', '身高', '血脂(总胆固醇)', '血糖', '肺活量'],
    u1d2: ['血压'],
    time: ['睡眠'],
    image: ['排泄物', '皮肤病']
  }),
  computed: {
    newHealthItem () {
      const _newHealthItem = JSON.parse(JSON.stringify(this.healthItem))
      if (this.time.includes(_newHealthItem.title)) {
        const _time = _newHealthItem.data
        _newHealthItem.data = [
          moment.duration(_time).hours(),
          moment.duration(_time).minutes()
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
          userId: this.$store.state.user.id
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
