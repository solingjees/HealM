export default {
  data () {
    return {
      message: {},
      showNotify: false
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    },
    token () {
      return this.$store.state.user.token
    },
    isDisplayMessageGetInfomation () {
      const hiddenMessageInformationRouteList = ['chat-patient', 'chat-doctor', 'diagnose']
      return hiddenMessageInformationRouteList.indexOf(this.$route.name) === -1
    },
    messageType () {
      let type = ''
      try {
        type = JSON.parse(this.message.content).type
      } catch {
        type = 'platform'
      }
      return type
    },
    messageData () {
      let data = ''
      try {
        data = JSON.parse(this.message.content).data
      } catch {
        data = this.message.content
      }
      return data
    }
  },
  watch: {
    isLogin (newval, oldval) {
      if (newval) {
        this.connectSocket()
      } else {
        this.$socket.disconnect()
      }
    }
  },
  mounted () {
    if (this.isLogin) {
      this.connectSocket()
    }
    this.$socket.on('connect', () => {
      // 发送auth请求
      this.loginSocket()
    })
  },
  methods: {
    connectSocket () {
      this.$socket.connect()
    },
    loginSocket () {
      setTimeout(() => {
        this.$socket.emit('login', {
          token: this.token
        })
      }, 500)
    }
  },
  sockets: {
    receiveMessage (data) {
      if (this.isDisplayMessageGetInfomation) {
        // 说明当前路由要求显示消息弹窗
        this.message = data
        if (data.receiveIdentity === this.$store.state.user.identity &&
          data.receiveId === this.$store.state.user.id) {
          this.showNotify = true
          setTimeout(() => {
            this.showNotify = false
          }, 4000)
        }
      }
    }
  }

}
