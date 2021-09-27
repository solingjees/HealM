<template>
  <router-view />
</template>
<script>
export default {
  name: 'Article',
  metaInfo: {
    meta: [
      { name: 'referrer', content: 'never' }
    ]
  }
}
</script>
<style lang="less" scoped>
@import './article.less';
</style>
