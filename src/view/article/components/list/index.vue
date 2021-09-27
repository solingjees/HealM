<template>
  <div class="articleContent">
    <!-- <div
      v-for="(value,index) in articleList"
      :key="index"
      class="articlePart"
    >
      <router-link :to="{name:'content',query:{'article':value}}">
        <img :src="value.pic">
        <div class="titlePart">
          <p>{{ value.title }}</p>
        </div>
      </router-link>
    </div> -->
  </div>
</template>
<script>
// import axios from 'axios'
// import articles from '@/assets/article'
export default {
  name: 'List',
  data () {
    return {
    //   articleList: articles
    }
  },
  mounted () {
    console.log(this.articleList)
    // axios.get('https://api.jisuapi.com/weixinarticle/get?channelid=14&start=10&num=100&appkey=010f0a7550b1cc73').then((res)=>{
    //   console.log(res)
    // })
  }
}
</script>
<style lang="less" scoped>
@import '~/src/index.less';
.articleContent{
    padding: 0 1em;
    .articlePart{
        margin-top:1em;
        img{
            border-radius: 1em  1em 0 0;
        }
    }
    .titlePart{
        padding: 1em 1em;
        background-color: rgb(110, 110, 110);
        border-radius: 0 0 1em 1em;
        p{
            font-size: @thirdSize;
            color:white;
        }
    }
}
</style>
