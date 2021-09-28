<template>
  <div class="info-card-wrapper">
    <Header
      :date="date"
      @on-add="handleAddPhysical"
      @on-change="handleChangeDate"
    ></Header>
    <div
      class="body"
    >
      <CardFolder
        v-if="imageList.length > 0"
        :key="cardFolderKey"
        class="card-folder"
        :card-height="300"
        :data-list="imageList"
        :index="0"
      >
        <template
          v-slot="{ index: innerIndex, data, isShow }"
        >
          <div class="container">
            <div class="title">
              <div class="left">
                第{{ innerIndex + 1 }}张图片
              </div>
              <div
                v-if="isShow"
                class="right"
              >
                <Button
                  type="error"
                  ghost
                  @click="handleOpenDeletePicture(innerIndex)"
                >
                  删除
                </Button>
              </div>
            </div>
            <hr>
            <div class="body">
              <img
                :src="data"
              >
            </div>
          </div>
        </template>
      </cardfolder>
      <div
        v-if="imageList.length < 3"
        class="add"
        @click="addPhysicalPicture"
      >
        添加新体检数据...
      </div>
    </div>

    <!-- <Modal
      v-model="needUpload"
      :title="'上传报告单'"
      :loading="true"
      @on-ok="submit"
    >
      <input-item
        type="image"
        @on-change-value="hasUploadFile(value)"
      />
    </Modal> -->
    <UpdatePhysicalModal
      v-model="isShowUpdatePhysicalModal"
      @add="handleAddPicture"
    />
    <ConfirmDeleteModal
      v-model="isShowConfirmDeleteModal"
      :index="confirmDeleteIndex"
      @delete="handleDeletePicture"
    />
  </div>
</template>

<script>
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import UpdatePhysicalModal from './components/UpdatePhysicalModal'
import moment from 'moment'
import Header from './components/Header.vue'
import CardFolder from '@/components/CardFolder'
export default {
  name: 'MyPhysical',
  components: {
    Header,
    CardFolder,
    UpdatePhysicalModal,
    ConfirmDeleteModal
  },
  props: {
    initDate: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    date: moment().format('YYYY-MM-DD'),
    imageList: [],
    physicalId: -1,
    cardFolderKey: 0,
    isShowUpdatePhysicalModal: false,
    isShowConfirmDeleteModal: false,
    confirmDeleteIndex: -1
  }),
  watch: {
    date (newval, oldval) {
      if (newval !== oldval) {
        this._getPhysicalData()
      }
    }
  },
  mounted () {
    if (this.initDate) {
      this.date = moment(this.initDate).format('YYYY-MM-DD')
    }
  },
  methods: {
    handleOpenDeletePicture (index) {
      this.confirmDeleteIndex = index
      this.isShowConfirmDeleteModal = true
    },
    handleDeletePicture () {
      this.cardFolderKey++
      this.imageList.splice(this.confirmDeleteIndex, 1)
    },
    handleAddPicture (newPicture) {
      this.cardFolderKey++
      this.imageList.push(newPicture)
    },
    handleChangeDate (date) {
      this.date = date
    },
    handleAddPhysical () {
      // 打开添加弹出层
    },
    addPhysicalPicture () {
      this.isShowUpdatePhysicalModal = true
    },
    async _getPhysicalData () {
      const res = await this.$axios.user.getPhysicalData({
        date: moment(this.date).format('YYYY-MM-DD')
      })
      if (res.status) {
        if (Object.keys(res.data).length > 0) {
          this.imageList = res.data.picture
          this.physicalId = res.data.id
        }
      }
    }
    // async deletePhysicalImage (index) {
    //   this.imageList.splice(index, 1)
    //   const res = await updatePhysicalData({
    //     date: require('moment')(this.date).format('YYYY-MM-DD'),
    //     physicalId: this.physicalId,
    //     picture: this.imageList
    //   })
    //   if (res.status) {
    //     this.$Message.success('删除成功')
    //   }
    // },
    // changeUploadState () {
    //   this.needUpload = true
    // },
    // hasUploadFile (value) {
    //   this.imageList.push(value)
    // },
    // async submit () {
    //   if (this.imageList != undefined && this.imageList.length != 0) {
    //     this.imageList.splice(index, 1)
    //     const res = await updatePhysicalData({
    //       date: require('moment')(this.date).format('YYYY-MM-DD'),
    //       picture: this.imageList
    //     })
    //     if (res.status) {
    //       this.$Message.success('上传成功')
    //       this.date = new Date()
    //     }
    //   } else { this.needUpload = false }
    // }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
.info-card-wrapper {
  .flex(column,space-around,center);
  width: 100%;
  .body{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    .card-folder{
        transition: all .2s;
    }
    .add{
        width: 100%;
        text-align: center;
        color: @themeColor;
    }
  }
}

.container{
    .title{
      .flex(row,space-between,center);
      .left{

      }
      .right{

      }
    }
    .body{
      width: 100%;
      padding: 0rem;
      height: fit-content;
      img{
        width: 100%;
      }
    }
    hr{
      background-color: @thirdColor;
      border:none;
      height: 1px;
    }
}
</style>
