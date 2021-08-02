<template>
  <div id="app">
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  sockets:{
    receiveMessage(data){
      if(this.$store.state.hasGetInfo){
        if(data.receiveId==this.$store.state.id && data.receiveIdentity==this.$store.state.receiveIdentity)
          this.$Message.info('你有一条新的消息，请注意查收')
      }
    }
  }
}
</script>

<style lang="less">
#app {
  html,
  body {
    width: 100%;
  }
}
</style>
