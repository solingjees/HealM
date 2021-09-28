<template>
  <div class="input-item-wrapper">
    <div
      v-if="title!== ''"
      class="title"
    >
      {{ title }}
    </div>
    <div class="input-area">
      <Input
        v-if="type === 'line'"
        class="content"
        :value="value"
        :disabled="disabled"
        :placeholder="'输入您的' + title"
        @on-change="changeValue"
      />
      <DatePicker
        v-if="type === 'date' || type === 'time'"
        class="content"
        type="date"
        :disabled="disabled"
        :value="newDate + ''"
        format="yyyy-MM-dd"
        placeholder="请选择日期"
        @on-change="changeDate"
      />
      <TimePicker
        v-if="type === 'time'"
        class="content time"
        format="HH:mm"
        :disabled="disabled"
        :value="newTime + ''"
        placeholder="请选择时间"
        @on-change="changeTime"
      />
      <Select
        v-if="type === 'select'"
        class="content"
        :disabled="disabled"
        :value="'' + value"
        @on-change="changeSelect"
      >
        <Option
          v-for="rangeItem in range"
          :key="'' + rangeItem.value"
          :value="'' + rangeItem.value"
        >
          {{ rangeItem.label }}
        </Option>
      </Select>
      <upload
        v-if="type === 'image'"
        class="content"
        :limit="uploadLimit"
        :initial-file-list="value instanceof Array? value : []"
        @on-change-image="changeImageUrl"
      />
      <Input
        v-if="type === 'textarea'"
        class="content"
        :value="value"
        maxlength="250"
        :disabled="disabled"
        show-word-limit
        type="textarea"
        :placeholder="placeHolder === ''? '请输入' + title : placeHolder"
        @on-change="changeValue"
      />
      <div class="append">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import upload from './components/upload'
export default {
  name: 'InputItem',
  components: {
    upload
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    type: {
      type: String,
      default: 'line' // line,textarea,date,age,time,select
    },
    disabled: {
      type: Boolean,
      default: false
    },
    range: {
      type: Array,
      default: () => []
    },
    // 时间值
    time: {
      type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: ''
    },
    'upload-limit': {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      newTime: '',
      newDate: ''
    }
  },
  computed: {
    uploadImageUrl () {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? this.$config.baseUrl.dev
          : this.$config.baseUrl.pro
      return baseUrl + this.$config.uploadImageUrl
    },
    token () {
      return this.$store.state.user.token
    }
  },
  watch: {
    time (newval, oldval) {
      if (this.type !== 'time') return ''
      if (newval !== oldval) {
        this.newTime = moment(newval.trim()).format('HH:mm')
      }
    },
    value (newval, oldval) {
      if (this.type !== 'time' || this.type !== 'date') return ''
      if (newval !== oldval) {
        this.newDate = moment(newval.trim()).format('YYYY-MM-DD')
      }
    }
  },
  methods: {
    changeValue (e) {
      this.$emit('on-change-value', e.target.value)
    },
    changeDate (date) {
      this.newDate = date
      if (this.type === 'time') {
        this.$emit('on-change-value', date + ' ' + (this.newTime || ''))
      } else {
        this.$emit('on-change-value', date)
      }
    },
    changeTime (time) {
      this.newTime = time
      this.$emit('on-change-value', (this.newDate || '') + ' ' + time + ':00')
    },
    changeSelect (value) {
      this.$emit('on-change-value', value)
    },
    changeImageUrl (imageUrl) {
      this.$emit('on-change-value', imageUrl)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.input-item-wrapper {
  width: 100%;
  min-height: 40px;
  margin-bottom: 2px;
  .flex(row,space-between,flex-start);
  .title {
    font-size: 16px;
    line-height: 32px;
    height: 32px;
    color: @titleColor;
    width: 100px;
  }
  .input-area {
    flex: 1;
    .flex(row,space-between,center);
    .content {
      flex: 1;
      &.time {
        margin-left: 3px;
      }
    }
    .append {
    }
  }
}
</style>
