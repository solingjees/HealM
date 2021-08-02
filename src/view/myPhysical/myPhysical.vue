<template>
  <div class="info-card-wrapper">
    <Row class="wrapper-head">
      <Col span="8" offset="8">
        <div class="transformDate">
          <DatePicker
            :open="openSelectDate"
            type="date"
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
      </Col>
      <Col col="6" offset="1">
        <Button type="primary" @click="changeUploadState">上传报告单</Button>
      </Col>
    </Row>
    <div class="split">
    </div>
    <div class="perPhysicalImage">
      <div v-if="imageList !== undefined && imageList.length!=0">
        <van-swipe-cell v-for="(tempImage,index) in imageList"  :key="tempImage" right-width=50>
          <van-cell>
            <img :src="tempImage">
          </van-cell>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="deletePhysicalImage(index)"/>
          </template>
        </van-swipe-cell>
      </div>
      <div v-if="imageList== undefined || imageList.length==0" class="propTextPart">
        <p class="propText">今天没有体检数据哦</p>
      </div>
    </div>
    <Modal
        v-model="needUpload"
        :title="'上传报告单'"
        :loading="true"
        @on-ok="submit"
      >
        <input-item
          type="image"
          @on-change-value="hasUploadFile(value)"
        />
      </Modal>
  </div>
</template>

<script>
import DownArrowIcon from '_icon/downArrow.png'
import {getPhysicalData,updatePhysicalData} from '@/api/user'
import { SwipeCell, Button,Cell } from 'vant'
import InputItem from '@/components/inputItem'
export default {
  name: 'MyPhysical',
  components:{
    'van-swipe-cell': SwipeCell,
    'van-button': Button,
    'van-cell':Cell,
    'input-item':InputItem
  },
  data: () => ({
    openSelectDate: false,
    DownArrowIcon,
    date: require('moment')(),
    imageList:[],
    physicalId:1,
    needUpload:false,
  }),
  methods: {
    handleChange (date,date2) {
      this.openSelectDate = false
      this.date=date
      this.toGetPhysicalData()
    },
    handleClickTransformDate () {
      this.openSelectDate = !this.openSelectDate
    },
    async toGetPhysicalData(){
      const res=await getPhysicalData({
        date:require('moment')(this.date).format('YYYY-MM-DD')
      });
      if(res.status){
        this.imageList=res.data.picture
        this.physicalId=res.data.id
      }
    },
    async deletePhysicalImage(index){
      this.imageList.splice(index,1);
      const res=await updatePhysicalData({
        date:require('moment')(this.date).format('YYYY-MM-DD'),
        physicalId:this.physicalId,
        picture:this.imageList
      });
      if(res.status){
        this.$Message.success("删除成功");
      }
    },
    changeUploadState(){
      this.needUpload=true
    },
    hasUploadFile(value){
      this.imageList.push(value)
    },
    async submit(){
      if(this.imageList != undefined &&this.imageList.length!=0){
        this.imageList.splice(index,1);
        const res=await updatePhysicalData({
          date:require('moment')(this.date).format('YYYY-MM-DD'),
          picture:this.imageList
        });
        if(res.status){
          this.$Message.success("上传成功");
          this.date=new Date()
        }
      }
      else
        this.needUpload=false
    }
  },
  mounted(){
    this.toGetPhysicalData()
  }
}
</script>

<style lang="less" scoped>
@import './myPhysical.less';
@import '~/src/index.less';
</style>
