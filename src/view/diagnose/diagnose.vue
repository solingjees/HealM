<template>
  <div class="mainPart">
    <Row type="flex" align="middle">
      <Col span="2" offset="2">
        <img src="@/assets/images/iconfont/nurse.png">
      </Col>
      <Col span="4" offset="1">
        <span class="titleText">已签约</span>
      </Col>
      <Col span="2">
        <Poptip trigger="hover" title="提示" word-wrap width="200" content="疑似病状：仅为医生根据健康数据的简单判断，具体病状请前往医院做相关检查">
          <img src="@/assets/images/iconfont/prompt.png" class="promptImaeg"/>
        </Poptip>
      </Col>
    </Row>
    <chatCard v-for="(key,index) in isAssignChat"
      :key="index" 
      :id='key.id'
      :opponentId='key.userOrDoctorId' 
      :avatar="key.avatar" 
      :name='key.name'
      :notReadNum='key.notReadNum'
      :chat='key.chat'/>
    <Row type="flex" align="middle" class="isChattingHead">
      <Col span="2" offset="2">
        <img src="@/assets/images/iconfont/nurse.png">
      </Col>
      <Col span="6" offset="1">
        <span class="titleText">正在聊天</span>
      </Col>
    </Row>
    <chatCard v-for="(key,index) in notAssignChat"
      :key="index" 
      :id='key.id' 
      :avatar="key.avatar" 
      :name='key.name'
      :notReadNum='key.notReadNum'
      :chat='key.chat'/>
  </div>
</template>

<script>
import chatCard from './components/chatcard'
import {getChatList} from '@/api/home'
export default {
  name: 'Diagnose',
  components:{chatCard},
  data(){
    return {
      isAssignChat:[],
      notAssignChat:[]
    }
  },
  methods:{

  },
  async mounted(){
    const res=await getChatList();
    if(res.status){
      this.isAssignChat=res.data.isAssign
      this.notAssignChat=res.data.notAssign
    }
  }
}
</script>

<style lang="less" scoped>
@import './diagnose.less';
@import '~/src/index.less';
</style>
