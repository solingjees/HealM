<template>
  <div class="contract-container">
    <div
      class="info"
    >
      {{ isISend? '您向医生发送 '+ messageData.date +' 体检数据':
        '病人向您发送 ' + messageData.date + ' 体检数据' }}
    </div>
    <div class="operate">
      <div
        style="border-top: 1px solid #e9e9e9;padding-top:6px;margin-top:6px;"
        class="dataList"
      >
        <CardFolder
          v-if="messageData.dataList.length > 0"
          class="card-folder"
          :card-height="300"
          :data-list="messageData.dataList"
          :index="0"
        >
          <template
            v-slot="{ index: innerIndex, data}"
          >
            <div class="container">
              <div class="title">
                第{{ innerIndex + 1 }}张图片
              </div>
              <hr>
              <div class="body">
                <img
                  :src="data"
                  :alt="'第'+ (innerIndex + 1)+'张图片'"
                >
              </div>
            </div>
          </template>
        </cardfolder>
      </div>
    </div>
  </div>
</template>

<script>
import CardFolder from '@/components/CardFolder'
export default {
  name: 'Physical',
  components: {
    CardFolder
  },
  props: {
    isISend: {
      type: Boolean,
      default: false
    },
    message: {
      type: Object,
      default: () => ({})
    },
    isAssigned: {
      type: Boolean,
      default: false
    },
    opponentId: {
      type: Number,
      default: -1
    },
    windowId: {
      type: Number,
      default: -1
    }
  },
  computed: {
    messageData () {
      return JSON.parse(this.message.content).data
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.contract-container{
  max-width: 70vw;
  box-sizing: border-box;
  padding: .5rem;
  .info{
    width: 100%;
    margin-bottom: .3rem;
    font-weight: bold;
  }
  .operate{
    width: 100%;
    box-sizing: border-box;
    .flex(row,space-between,center);
  }
}
</style>
