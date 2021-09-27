<template>
  <div class="contract-container">
    <div
      class="info"
    >
      {{ isISend? '您向医生发送 '+ messageData.date +' 健康项':
        '病人向您发送 ' + messageData.date + ' 健康项' }}
    </div>
    <div class="operate">
      <div
        style="border-top: 1px solid #e9e9e9;padding-top:6px;margin-top:6px;"
        class="dataList"
      >
        <template v-for="(item,index) in messageData.dataList">
          <div
            v-if="item.detailData && item.detailData.recordData.length > 0"
            :key="'data-item-title-'+index"
            class="title"
          >
            {{ item.detailData.itemData.name }}
          </div>
          <div
            v-if="item.detailData && item.detailData.recordData.length > 0"
            :key="'data-item-body'+index"
            class="body"
          >
            <RecordItem
              v-for="(recordItem, index2) in item.detailData.recordData"
              :key="'data-item-body-record-'+index2"
              :disabled="true"
              :time-format="'HH:mm:ss'"
              :data-name-list="item.detailData.itemData.newRecordName || []"
              :data="recordItem"
              :type="getInputType(item.detailData.itemData.dataType)"
              :unit="item.detailData.itemData.unit"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import RecordItem from '@/view/HealthDetail/components/Info/components/InfoRecord/components/recordItem.vue'
export default {
  name: 'HealthItem',
  components: {
    RecordItem
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
  },
  methods: {
    getInputType (dataType) {
      //  dataType:1, //0表示float，1代表datetime，2表示picture
      switch (dataType) {
        case 0:
          return 'line'
        case 1:
          return 'time'
        case 2:
          return 'image'
        default:
          return 'line'
      }
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
