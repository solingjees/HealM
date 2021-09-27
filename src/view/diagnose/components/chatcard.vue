<template>
  <div
    class="chat-card-container"
    @click="handleClickCard"
  >
    <div class="first-line">
      <div class="left">
        <div class="avatar">
          <img
            :src="itemData.avatar"
            alt="avatar"
          >
        </div>
        <div class="name">
          {{ itemData.name }}
        </div>
        <div
          v-if="isAssigned && itemData.possibleDisease"
          class="disease"
        >
          <Tag>疑似病症: <span class="content">{{ itemData.possibleDisease }}</span></Tag>
        </div>
      </div>
      <div class="right">
        <Badge :count="itemData.notReadNum"></Badge>
      </div>
    </div>
    <div class="second-line">
      {{ messageData }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChatCard',
  props: {
    itemData: {
      type: Object,
      default: () => ([])
    },
    userId: {
      type: [String, Number],
      default: ''
    },
    isAssigned: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    messageType () {
      let type = ''
      try {
        type = JSON.parse(this.itemData.chat).type
      } catch {
        type = 'platform'
      }
      return type
    },
    messageData () {
      let data = ''
      try {
        if (this.messageType === 'info') {
          data = JSON.parse(this.itemData.chat).data
        } else {
          data = '[您收到一条消息]'
        }
      } catch {
        data = this.message.content
      }
      return data
    },
    identity () {
      return this.$store.state.user.identity
    }
  },
  methods: {
    handleClickCard () {
      this.$router.push({
        name: this.identity === 0 ? 'chat-patient' : 'chat-doctor',
        query: {
          windowId: this.itemData.id,
          name: this.itemData.name,
          isAssigned: this.isAssigned,
          opponentId: this.itemData.userOrDoctorId
        }
      })
    }
  }
}
</script>
<style lang="less">
@import '~/src/index.less';
.chat-card-container{
    width: 100%;
    background-color: white;
    border-radius: .5rem;
    border:none;
    box-shadow: @boxShadow;
    margin: .7rem 0rem;
    padding: .8rem;
    .first-line{
      .flex(row,space-between,center);
      .left{
          .flex(row,space-between,center);
          .avatar{
            width: 32px;
            height: 32px;
            overflow: hidden;
            border-radius: 1rem;
            img{
              width: 100%;
            }
          }
          .name{
            margin-left: .5rem;
            color: @titleColor;
            font-size: 1rem;
          }
          .disease{
            margin-left: .5rem;
            .content{
              color: orange;
            }
          }
      }
      .right{
         .ivu-badge{
           .ivu-badge-count{
             font-size: .2rem !important;
           }
         }
      }
    }
    .second-line{
        margin-top: .3rem;
        color: @postTitleColor;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>
