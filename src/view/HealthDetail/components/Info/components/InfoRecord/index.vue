<template>
  <div class="info-record-wrapper">
    <div
      v-if="healthDetailData.itemData"
      id="tag"
    >
      {{ parseInt(healthDetailData.itemData.record) ? '当日记录' : '历史记录' }}
    </div>
    <div id="recordList">
      <record-item
        v-for="(item, recordIndex) in recordDataList"
        :key="'record-item-' + recordIndex"
        :data-name-list="dataNameList"
        :data="item"
        :type="inputType"
        :unit="healthDetailData.itemData.unit"
        :is-highlight="recordIndex === index"
        :is-today-record="parseInt(healthDetailData.itemData.record)"
        @on-edit="editRecord(recordIndex)"
        @on-delete="deleteRecord(recordIndex)"
      />
    </div>
    <!-- 修改数据项 -->
    <Modal
      v-if="healthDetailData.itemData"
      v-model="showEditModal"
      :title="'编辑' + healthDetailData.itemData.name + ' ' + modalTitleTime"
      :loading="true"
      @on-ok="submitEditRecord"
    >
      <input-item
        v-for="(item, index) in healthDetailData.itemData.newRecordName"
        :key="'input-item-' + index"
        :title="item"
        :type="inputType"
        :upload-limit="3"
        :value="modalPreData.data ?
          ( healthDetailData.itemData.dataType !== 2? //该项目是否是图片数据
            modalPreData.data[index] : modalPreData.data )
          : ''"
        @on-change-value="(value) => changeValue('data', value, index)"
      >
        <div
          v-if="
            healthDetailData.itemData.unit &&
              healthDetailData.itemData.unit !== '无'
          "
          class="append"
        >
          {{ healthDetailData.itemData.unit }}
        </div>
      </input-item>
    </Modal>
    <!-- 删除数据项 -->
    <Modal
      v-if="healthDetailData.itemData"
      v-model="showDeleteModal"
      :title="'删除'"
      :loading="true"
      @on-ok="submitDeleteRecord"
    >
      您确定删除{{ healthDetailData.itemData.name }}于{{
        modalTitleTime
      }}的数据记录吗
    </Modal>
  </div>
</template>

<script>
import InputItem from '@/components/inputItem'
import RecordItem from './components/recordItem.vue'
import moment from 'moment'
import { updateHealthDetailData, deleteHealthDetailData } from '_api/user'
export default {
  name: 'InfoRecord',
  components: {
    'record-item': RecordItem,
    'input-item': InputItem
  },
  props: {
    healthDetailData: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    showEditModal: false,
    showDeleteModal: false,
    modalPreData: {}
  }),
  computed: {
    recordDataList () {
      return JSON.parse(JSON.stringify(this.healthDetailData.recordData || ''))
    },
    dataNameList () {
      return this.healthDetailData.itemData.newRecordName ?? []
    },
    modalTitleTime () {
      return moment(this.modalPreData.createTime).format('YYYY-MM-DD HH:mm')
    },
    inputType () {
      //  dataType:1, //0表示float，1代表datetime，2表示picture
      switch (this.dataType) {
        case 0:
          return 'line'
        case 1:
          return 'time'
        case 2:
          return 'image'
        default:
          return 'line'
      }
    },
    dataType () {
      return this.healthDetailData.itemData ? parseInt(this.healthDetailData.itemData.dataType) : 0
    }
  },
  methods: {
    editRecord (recordIndex) {
      this.modalPreData = this.healthDetailData.recordData[recordIndex]
      this.modalPreData.index = recordIndex
      this.showEditModal = true
    },
    deleteRecord (recordIndex) {
      this.modalPreData = this.healthDetailData.recordData[recordIndex]
      this.modalPreData.index = recordIndex
      this.showDeleteModal = true
    },
    // 提交编辑后的内容
    async submitEditRecord () {
      const index = this.modalPreData.index
      const postData = {
        data: this.modalPreData.data,
        recordId: this.modalPreData.id,
        date: moment(this.modalPreData.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
      delete postData.createTime
      delete postData.index
      const res = await updateHealthDetailData(postData)
      if (res.status) {
        // 更新成功
        this.$emit('on-change-health-record', this.modalPreData)
        this.showEditModal = false
      }
    },
    // 提交删除数据记录
    async submitDeleteRecord () {
      const res = await deleteHealthDetailData({ recordId: this.modalPreData.id })
      if (res.status) {
        // 删除成功
        this.$emit('on-delete-health-record', this.modalPreData.index)
        this.showDeleteModal = false
      }
    },
    // 修改提交表单的内容
    changeValue (key, value, index) {
      if (!(this.modalPreData[key] instanceof Array)) {
        this.modalPreData[key] = value
      } else {
        this.modalPreData[key][index] = value
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.info-record-wrapper {
  margin: 0rem 2rem;
  padding-top: 1rem;
  #tag {
    display: block;
    font-size: 1.2rem;
    color: @titleColor;
    font-weight: 450;
  }
  #recordList {
    width: 100%;
  }
}
.append {
  margin: 0px 10px;
}
</style>
