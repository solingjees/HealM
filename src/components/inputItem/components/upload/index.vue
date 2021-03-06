<template>
  <div>
    <div
      v-for="item in uploadFileList"
      :key="'uploadFile-' + item.url"
      class="demo-upload-list"
    >
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          />
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        />
      </template>
    </div>
    <Upload
      v-show="uploadFileList.length < limit"
      ref="upload"
      :show-upload-list="false"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="1024"
      type="drag"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      :action="uploadImageUrl"
      :headers="{
        Authorization: token,
      }"
      style="display: inline-block; width: 58px"
    >
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon
          type="ios-camera"
          size="20"
        />
      </div>
    </Upload>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    limit: {
      type: Number,
      default: 1
    },
    initialFileList: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    uploadFileList: []
  }),
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
    },
    defaultFileList () {
      return this.initialFileList.reduce(function (prev, cur) {
        prev.push({
          name: cur,
          url: cur,
          status: 'finished'
        })
        return prev
      }, [])
    }
  },
  watch: {
    defaultFileList (newval, oldval) {
      this.$refs.upload.fileList = newval
      this.uploadFileList = newval
    }
  },
  mounted () {
    this.uploadFileList = this.$refs.upload.fileList
  },
  methods: {
    handleFormatError (file) {
      this.$Message.error('格式错误')
    },
    handleMaxSize (file) {
      this.$Message.error('图片不得大于1M')
    },
    handleBeforeUpload () {
      const check = this.uploadFileList.length <= this.limit
      if (!check) {
        this.$Message.error(`只能上传${this.limit}张图片`)
      }
      return check
    },
    handleRemove (file) {
      const index = this.$refs.upload.fileList.findIndex(fileListItem => {
        return fileListItem.url === file.url
      })
      this.$refs.upload.fileList.splice(index, 1)
      if (this.limit === 1) {
        this.$emit('on-change-image', '')
      } else {
        this.$emit('on-change-image', this.$refs.upload.fileList)
      }
    },
    handleSuccess (res, file) {
      if (res.status) {
        file.url = this.$config.imageHeader + res.data.url
        if (this.limit === 1) {
          this.$emit('on-change-image', file.url)
        } else {
          const fileUrlList = this.uploadFileList.reduce(function (prev, cur) {
            prev.push(cur.url)
            return prev
          }, [])
          this.$emit('on-change-image', fileUrlList)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
