<template>
  <div class="article-content-wrapper">
    <div
      v-if="Object.keys(articleInfo).length > 0"
      class="first"
    >
      <div
        class="return"
        @click="goBack"
      >
        <img :src="LeftArrowIcon" />
      </div>
      <h2 class="title">
        {{ articleInfo.title }}
      </h2>
    </div>
    <div
      v-if="Object.keys(articleInfo).length > 0"
      class="second"
    >
      <div class="avatar">
        <img
          :src="articleInfo.wximg"
          alt="avatar"
        >
      </div>
      <div class="name">
        <span>{{ articleInfo.wxname }}</span>
        <span>{{ articleInfo.author }}</span>
        <span>{{ require('moment')(articleInfo.ctime).fromNow() }}</span>
      </div>
    </div>
    <div
      v-if="Object.keys(articleInfo).length > 0"
      class="introduction"
    >
      {{ articleInfo.signature }}
    </div>
    <div
      v-if="Object.keys(articleInfo).length > 0"
      id="htmlBody"
      class="content"
      v-html="articleInfo.content"
    ></div>
  </div>
</template>
<script>
import LeftArrowIcon from '_icon/left-arrow.png'
import { getWxContent } from '@/api/article'
export default {
  name: 'Content',
  props: {
    wxUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      articleInfo: {},
      LeftArrowIcon
    }
  },
  mounted () {
    this._getWxContent()
  },
  updated () {
    this.replaceImg()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    replaceImg () {
      const imgs = document.getElementById('htmlBody').getElementsByTagName('img')
      imgs.forEach(element => {
        console.log(element)
        element.setAttribute('src', element.getAttribute('data-src'))
      })
    },
    _getWxContent () {
      getWxContent({
        url: this.wxUrl
      }).then(res => {
        if (res.status) {
          const data = res.data
          if (data.code === 200) {
            this.articleInfo = data.newslist[0]
          } else {
            throw new Error()
          }
        } else {
          throw new Error()
        }
      }).catch(() => {
        this.$$Message.error('获取微信文章内容错误')
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~/src/index.less';
.textStyle(){
    color: white;
    text-shadow: 1px 1px 0px black;
    z-index: 101;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.article-content-wrapper{
  width: 100%;
  box-sizing: border-box;
  padding: .5rem;
  .first{
      width: 100%;
      .flex(row,flex-start,flex-start);
      .return{
        display: inline-block;
        img{
            width: 40px;
            height: 40px;
        }
      }
      .title{
        margin-top: .2rem;
        line-height: 2rem;
        display: inline-block;
        flex: 1;
        width: 80%;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      }
      .content{
        width: 100%;
      }
  }
  .second{
    .flex(row,flex-start,center);
    width: 100%;
    box-sizing: border-box;
    padding: .5rem;
    .avatar{
      display: inline-block;
      width: 1.5rem;
      overflow: hidden;
      border-radius: .75rem;
      img{
        width: 100%;
      }
    }
    .name{
      display: inline-block;
      margin-left: .5rem;
      span{
        color: #999;
        font-size: 1rem;
        margin-right: .5rem;
      }
    }
  }
  .introduction{
    width: 100%;
    box-sizing: border-box;
    padding: .7rem;
    font-size: .8rem;
    box-shadow: @boxShadow;
    background-color: white;
    border-radius: .5rem;
    margin-bottom: 1rem;
    margin-top: .3rem;
  }
}
</style>
