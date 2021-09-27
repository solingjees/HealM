<template>
  <div class="function-tags-container">
    <div class="function-tags">
      <div
        v-for="(tagItem,index) in tagList"
        :key="'tag-'+index"
        class="tag-item"
        :class="{
          disabled: timeDelayList[index] > 0
        }"
        @click="handleTagClick(tagItem,index)"
      >
        <img
          :src="tagItem.icon"
          :alt="tagItem.title"
        />
        <span class="title">
          {{ tagItem.title }}
          {{ Math.ceil(timeDelayList[index] / 1000) > 0? '('+ Math.ceil(timeDelayList[index] / 1000)+')':'' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FunctionTag',
  props: {
    tagList: {
      type: Array,
      default: () => ([])
    },
    messageList: {
      type: Array,
      default: () => ([])
    },
    initialTimeDelayList: {
      type: Array,
      default: () => ([0, 0, 0])
    }
  },
  data () {
    return {
      timeIntervalList: [],
      timeDelayList: []
    }
  },
  watch: {
    initialTimeDelayList (newval) {
      this.handleChangeInitialTimeDelayList()
    }
  },
  methods: {
    handleChangeInitialTimeDelayList () {
      this.timeDelayList = JSON.parse(JSON.stringify(this.initialTimeDelayList))
      for (let index = 0; index < this.timeDelayList.length; index++) {
        if (this.initialTimeDelayList[index] > 0) {
          this.timeIntervalList[index] = setInterval(() => {
            const _timeDelayList = JSON.parse(JSON.stringify(this.timeDelayList))
            if (_timeDelayList[index] > 0) {
              _timeDelayList[index] -= 1000
            } else {
              clearInterval(this.timeIntervalList[index])
            }
            this.timeDelayList = _timeDelayList
          }, 1000)
        }
      }
    },
    handleTagClick (tagItem, index) {
      // 如果windowId不存在，就让用户自己先发送一条数据

      if (typeof this.$route.query.windowId === 'undefined' || this.$route.query.windowId === -1) {
        // 说明没有windowId
        this.$Message.info('向对方打个招呼再操作')
        return
      }

      if (this.timeDelayList[index] > 0) return
      this.timeDelayList[index] = tagItem.timeDelay || 0
      this.timeIntervalList[index] = setInterval(() => {
        const _timeDelayList = JSON.parse(JSON.stringify(this.timeDelayList))
        if (_timeDelayList[index] > 0) {
          _timeDelayList[index] -= 1000
        } else {
          clearInterval(this.timeIntervalList[index])
        }
        this.timeDelayList = _timeDelayList
      }, 1000)
      this.$emit('tagClick', { tagItem, index })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.function-tags-container{
  width: 100%;
  box-sizing: border-box;
  padding:.5rem;
  .function-tags{
    width: 100%;
    overflow: scroll;
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 3rem;
    .tag-item{
      display: inline-block;
      margin-right: .5rem;
      background-color: white;
      border-radius: 2rem;
      height: 2rem;
      line-height: 2rem;
      box-sizing: border-box;
      padding: 0rem  1rem;
      img{
        width: 1rem;
      }
      &:hover{
        background-color: @thirdColor;
      }
      &.disabled{
        background-color: @thirdColor;
      }
    }
}
}

</style>
