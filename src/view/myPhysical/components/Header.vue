<template>
  <div class="health-detail-header-wrapper">
    <div class="itemlist">
      <div class="transformDate">
        <DatePicker
          :open="openSelectDate"
          type="date"
          :value="date"
          @on-change="handleChange"
        >
          <div
            class="datePicker-template"
            @click="handleClickTransformDate"
          >
            <span>{{
              require('moment')(date).format('YYYY-MM-DD') ===
                require('moment')().format('YYYY-MM-DD')
                ? '今天'
                : date
            }}</span>
            <img
              :src="DownArrowIcon"
              alt="downArrow"
            >
          </div>
        </DatePicker>
      </div>
    </div>
    <div class="addBtn">
      <Button
        type="primary"
        @click="add"
      >
        添加新体检
      </Button>
    </div>
  </div>
</template>

<script>
import DownArrowIcon from '_icon/downArrow.png'
export default {
  name: 'PhysicalHeader',
  props: {
    date: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    DownArrowIcon,
    openSelectDate: false
  }),
  methods: {
    add () {
      this.$emit('on-add')
    },
    handleClickTransformDate () {
      this.openSelectDate = !this.openSelectDate
    },
    handleChange (date) {
      this.openSelectDate = false
      this.$emit('on-change', date)
    }

  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.health-detail-header-wrapper {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0px 20px 0px 10px;
  border-bottom: 1px solid @thirdColor;
  position: relative;
  background-color: white;
  .flex(row,space-between,center);
  .return {
    position: absolute;
    float: left;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .itemlist {
    flex: 1;
    box-sizing: border-box;
    padding: 0px 10px;
    .flex(row,center,center);
    .transformDate {
        .flex(row,center,center);
        .datePicker-template {
            .flex(row,center,center);
            img {
                width: 1.875rem;
                height: 1.875rem;
            }
            span {
                font-size: 1.125rem;
                color: @titleColor;
                white-space: nowrap;
            }
        }
    }
  }
  .addBtn {
    position: absolute;
    right: 1rem;
  }
}
</style>
