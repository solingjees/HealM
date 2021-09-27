<template>
  <div class="diagnose-container">
    <catagory-header
      :icon="DoctorIcon"
      title="签约中"
      need-tips
      tool-tips-content="疑似病状:仅为医生根据健康数据的简单判断,具体病症请前往医院做相关检查."
    >
      <div
        slot="right"
        v-hasIdentity="[0]"
      >
        <Button
          type="primary"
          @click="goToSearch"
        >
          搜索
        </Button>
      </div>
    </catagory-header>
    <template v-if="assignChatList.length > 0">
      <chat-card
        v-for="(assignChatItem, index) in assignChatList"
        :key="'assign-chat-item-'+index"
        :user-id="userId"
        is-assigned
        :item-data="assignChatItem"
      ></chat-card>
    </template>
    <template v-else>
      <div class="noData">
        暂无聊天
      </div>
    </template>
    <catagory-header
      :icon="DoctorIcon"
      title="未签约"
    >
    </catagory-header>
    <template v-if="notAssignChatList.length > 0">
      <chat-card
        v-for="(notAssignChatItem, index) in notAssignChatList"
        :key="'notassign-chat-item-'+index"
        :user-id="userId"
        :item-data="notAssignChatItem"
      ></chat-card>
    </template>
    <template v-else>
      <div class="noData">
        暂无聊天
      </div>
    </template>
  </div>
</template>

<script>
import ChatCard from './components/chatcard.vue'
import CatagoryHeader from '@/components/catagoryHeader'
import DoctorIcon from '_icon/doctor.png'
export default {
  name: 'Diagnose',
  components: {
    CatagoryHeader,
    ChatCard
  },
  data: () => ({
    DoctorIcon,
    assignChatList: [],
    notAssignChatList: []
  }),
  computed: {
    userId () {
      return this.$store.state.user.id
    }
  },
  mounted () {
    this.getChatList()
  },
  sockets: {
    receiveMessage (data) {
      const index = this.assignChatList.findIndex(
        element => element.userOrDoctorId === data.senderId
      )
      if (index !== -1) {
        // 说明原来就聊天过
        this.assignChatList[index].chat = data.content
        this.assignChatList[index].notReadNum += 1
        return
      }
      const index2 = this.notAssignChatList.findIndex(
        element => element.userOrDoctorId === data.senderId
      )
      if (index2 !== -1) {
        // 说明原来就聊天过
        this.notAssignChatList[index2].chat = data.content
        this.notAssignChatList[index2].notReadNum += 1
        return
      }
      // 如果这是一条新的聊天信息
      this.notAssignChatList.push({
        avatar: data.avatar,
        chat: data.content,
        id: data.id,
        name: data.name,
        notReadNum: 1,
        userOrDoctorId: data.senderId
      })
    }
  },
  methods: {
    goToSearch () {
      this.$router.push({
        name: 'search'
      })
    },
    async getChatList () {
      const res = await this.$axios.home.getChatList()
      if (res.status) {
        this.assignChatList = res.data.isAssign
        this.notAssignChatList = res.data.notAssign
      }
    }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
.diagnose-container{
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  .noData{
    padding: .5rem 0rem;
    width: 100%;
    font-size: 1.1rem;
    color:#999;
  }
}
</style>
