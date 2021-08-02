<template>
  <router-view></router-view>
</template>
<script>
export default {
  name:'article',
  metaInfo:{
    meta:[
      {name:'referrer',content:'never'}
    ]
  }
}
</script>
<style lang="less" scoped>
@import './article.less';
</style>
