<template>
  <div>
    <Row type='flex' align='middle' class='header'>
      <Col span='4' offset='1'>
        <router-link :to="{'name':'diagnose'}">
          <img :src='LeftArrowIcon'/>
        </router-link>
      </Col>
      <Col span='10' offset='2'>
        <p class='chatTitle'>{{this.$route.query.name}}</p>
      </Col>
    </Row>
    <div class='content'>
        <Bubble v-for='(key,index) in messages' :key='index' :message='key' :opponentId='opponentId'></Bubble>
    </div>
    <div class="inputPart">
        <Row type='flex' align='middle'>
          <Col span='1'>
            <a class="emojiButton" @click="showEmojiSelect">😀</a>
          </Col>
          <Col span='16' offset='1'>
            <Input :border='false' v-model="inputText" placeholder="点击输入内容" @on-focus="closeMorePart()"/>
          </Col>
          <Col span="2" class="moreOperateButton">
            <a @click="showMoreOperatePart()">
              <img src="@/assets/images/iconfont/plus-circle.png">
            </a>
          </Col>
          <Col span='3'>
            <Button type='primary' @click="sendMessage()">
              发送
            </Button>
          </Col>
        </Row>
        <div v-if="showEmoji" class="browBox">
          <ul>
              <!--生成对应的表情包-->
              <li v-for="(item, index) in faceList" :key="index" >
                  <a @click="getBrow(index)">{{ item }}</a>
              </li>
          </ul>
        </div>
        <div v-if='showMoreOperate' class="moreOperatePart">
          <Row v-if='this.$store.state.user.identity==0'>
            <Col span="6" offset='2' class="perMoreOperate">
              <a @click="showHealthDataModal()">
                <img src="@/assets/images/iconfont/book.png">
                <p>健康管理</p>
              </a>
            </Col>
            <Col span="6" offset='1' class="perMoreOperate">
              <a @click="showPhysicalModal()">
                <img src="@/assets/images/iconfont/shield-cross.png">
                <p>体检报告</p>
              </a>
            </Col>
            <Col span="6" offset='1' class="perMoreOperate">
              <a href="#" @click="commitContract()">
                <img src="@/assets/images/iconfont/hetong.png">
                <p>发起签约</p>
              </a>
            </Col>
          </Row>
          <Modal
            v-model='showHealthData'
            :title='"选择需要发送的健康数据"'
            @on-ok='confirmHealthData'
          >
            <p class='modalTitle'>请选择健康项</p>
            <Checkbox-group v-model='selectHealthItemName' class='selectHealthItem' @on-change='changeSelectHealthItem()'>
              <Checkbox label='体重'></Checkbox>
              <Checkbox label='身高'></Checkbox>
              <Checkbox label='血压'></Checkbox>
              <Checkbox label='血脂'></Checkbox>
              <Checkbox label='血糖'></Checkbox>
              <Checkbox label='肺活量'></Checkbox>
              <Checkbox label='睡眠'></Checkbox>
              <Checkbox label='排泄物'></Checkbox>
              <Checkbox label='皮肤病'></Checkbox>
            </Checkbox-group>
          </Modal>
          <Modal
            v-model='showPhysical'
            :title='"选择体检的日期"'
            @on-ok='confirmPhysical()'
           >
            <p class="modalTitle">请选择需要发送的体检日期</p>
            <Date-picker type='date' v-model='selectDate' @on-change='changePhysicalDate()'></Date-picker>
          </Modal>
          <Row v-if='this.$store.state.user.identity==1'>
            <Col span="6" offset='5' class="perMoreOperate">
              <router-link :to="{name:'prescription',query:{'userId':this.$route.query.opponentId}}">
                <img src="@/assets/images/iconfont/book.png">
                <p>操作处方</p>
              </router-link>
            </Col>
            <Col span="6" offset='1' class="perMoreOperate">
              <router-link :to='{name:"myHealth",query:{"userId":this.$route.query.opponentId}}'>
                <img src="@/assets/images/iconfont/shield-cross.png">
                <p>健康信息</p>
              </router-link>
            </Col>
          </Row>
        </div>
    </div>
  </div>
</template>

<script>
import LeftArrowIcon from '_icon/left-arrow.png'
import {getAllChatMessages,getPhysicalData} from '@/api/user'
import {getHealthData} from '@/api/home'
import Bubble from './components/Bubble'
import InputItem from '@/components/inputItem'
export default {
  name: 'Chat',
  components:{Bubble,InputItem},
  data(){
    return {
      windowId:1,
      messages:[],
      LeftArrowIcon,
      inputText:'',
      faceList:[],
      showEmoji:false,
      showMoreOperate:false,
      opponentId:this.$route.query.opponentId,
      showHealthData:false,
      selectDate:'',
      selectHealthItemName:[],
      selectHealthItemIds:[],
      healthItemId:{
        '体重':1,
        '身高':2,
        '血压':3,
        '血脂':4,
        '血糖':5,
        '肺活量':6,
        '睡眠':7,
        '排泄物':8,
        '皮肤病':9
      },
      showPhysical:false
    }
  },
  methods:{
    //获得对应的表情
    getBrow(index) {
      console.log('aaa')
        for (let i in this.faceList) {
            if (index == i) 
              this.inputText += this.faceList[index];
        }
    },
    showEmojiSelect(){
      this.showEmoji=!this.showEmoji
    },
    showMoreOperatePart(){
      this.showMoreOperate=!this.showMoreOperate
    },
    closeMorePart(){
      this.showEmoji=false
      this.showMoreOperate=false
    },
    sendMessage(){
      this.$socket.emit('sendMessage',{
        senderId:this.$store.state.user.id,
        receiveId:parseInt(this.opponentId),
        content:this.inputText
      })
      this.inputText=''
    },
    commitContract(){
      this.$socket.emit('commitContract',{
        userId:this.$store.state.user.id,
        doctorId:parseInt(this.opponentId),
      })
    },
    showHealthDataModal(){
      this.showHealthData=true
      this.showMoreOperate=false
    },
    showPhysicalModal(){
      this.showPhysical=true
      this.showMoreOperate=false
    },
    changeSelectHealthItem(){
      this.selectHealthItemIds.splice(0)
      for(var temp of this.selectHealthItemName){
        this.selectHealthItemIds.push(this.healthItemId[temp])
      }
    },
    changeHealthItemDate(date){
      this.healthItemDate=require('moment')(this.healthItemDate).format('YYYY-MM-DD')
    },
    async confirmHealthData(){
      var selectHealthItemData=[]
      const res=await getHealthData({
        userId:this.$store.state.user.id
      })
      if(res.status){
        for(var  tempData of res.data.itemData){
          if(this.selectHealthItemIds.indexOf(tempData.healthItemId)!=-1){
            selectHealthItemData.push({
              data:tempData.data,
              unit:tempData.unit,
              time:tempData.time
              })
          }
        }
      }
      var healthData=''
      for(var tempData of selectHealthItemData){
        for(var key in  tempData.data){
          var value=tempData.data[key].toString()
          if(value.startsWith('http'))
            healthData+=(key+': '+'<img style="width:70vw;height:auto;" src="'+value+'"/><br/>'+'&nbsp;&nbsp;时间: '+tempData.time+'<br/>')
          else{
            if(tempData.unit!='undefined')
              healthData+=(key+': '+value+tempData.unit+'<br/>'+'&nbsp;&nbsp;时间: '+tempData.time+'<br/>')
          }
        } 
      }
      this.$socket.emit('sendMessage',{
        senderId:this.$store.state.user.id,
        receiveId:parseInt(this.opponentId),
        content:healthData
      })
    },
    changePhysicalDate(){
      this.selectDate=require('moment')(this.selectDate).format('YYYY-MM-DD')
    },
    async confirmPhysical(){
      const res=await getPhysicalData({
        date:this.selectDate
      })
      if(res.status){
        if(typeof(res.data.id)!='undefined'){
          var physicalData='体检照片：<br/>'+'&nbsp;&nbsp;时间: '+res.data.createTime+'<br/>'
          for(var tempData of res.data.picture){
            physicalData+='<img style="width:70vw;height:auto;" src="'+tempData+'"/><br/>'
          }
          this.$socket.emit('sendMessage',{
            senderId:this.$store.state.user.id,
            receiveId:parseInt(this.opponentId),
            content:physicalData
          })
        }
        else
          this.$Message.warning('这天没有体检数据哦')
      }
    }
  },
  sockets:{
    receiveMessage(data){
      var strData=data.toString()
      if(!((strData.startsWith('<p>对方发起一个签约</p>') && this.$store.state.user.identity==0)||
            (strData.startsWith('正在发起签约请求....') && this.$store.state.user.identity==1)))
        this.messages.push(data)
    },
    agreeBothContract(){
      this.$Message.success("签约成功")
      if(this.$store.state.user.identity==1){
        //如果是医生2秒后刷新该页面
        let that=this
       setTimeout(2000,()=>{
         that.$route.go(0)
       }) 
      }
    },
    refuseBothContract(){
      this.$Message.error("拒绝签约")
      if(this.$store.state.user.identity==1){
        //如果是医生2秒后刷新该页面
        let that=this
       setTimeout(2000,()=>{
         that.$route.go(0)
       }) 
      }
    }
  },
  async mounted(){
    //socket进行连接
    this.$socket.connect()
    this.$socket.emit('readMessage',{
      windowId:this.windowId
    })
    //加载emoji表情包
    const appData = require("@/assets/emoji.json"); 
    for (let i in appData) {
        this.faceList.push(appData[i].char);
    }

    this.windowId=parseInt(this.$route.query.id)
    const res=await getAllChatMessages({
      windowId:this.windowId
    })
    if(res.status){
      for(var message of res.data){
        var strContent=message.content.toString()
        if(!((strContent.startsWith('<p>对方发起一个签约</p>') && this.$store.state.user.identity==0)||
            (strContent.startsWith('正在发起签约请求....') && this.$store.state.user.identity==1)))
          this.messages.push(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
@import './chat.less';
</style>
