<template>
  <div class="user-center-wrapper">
    <UserInfoCard :user-info="userInfo" />
    <UserInfoItems
      :user-info="userInfo"
    />
    <div class="ask">
      <Button
        type="primary"
        class="button"
        @click="goToChat"
      >
        咨询
      </Button>
    </div>
  </div>
</template>

<script>
import UserInfoCard from './components/userInfoCard'
import UserInfoItems from './components/userInfoItems'
export default {
  name: 'UserCenter',
  components: {
    UserInfoCard,
    UserInfoItems
  },
  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data: () => ({
    userInfo: {}
  }),
  mounted () {
    this.getDoctorInfo()
  },
  methods: {
    async getDoctorInfo () {
      const res = await this.$axios.user.getDoctorInfo({
        id: parseInt(this.id)
      })
      if (res.status) {
        this.userInfo = res.data
      }
    },
    goToChat () {
      const _query = {
        name: this.userInfo.name,
        opponentId: parseInt(this.$route.query.id),
        isAssigned: this.userInfo.isAssign // 需要修改
      }
      if (this.userInfo.windowId !== -1) {
        _query.windowId = this.userInfo.windowId
      }
      this.$router.push({
        name: 'chat-patient',
        query: _query
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-center-wrapper{
  .ask{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    .button{
      width: 100%;
    }
  }
}
</style>
