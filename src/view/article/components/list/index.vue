<template>
  <div
    id="body"
    class="article-list-container"
  >
    <div class="slider">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
        :initial-swipe="sliderIndex"
      >
        <van-swipe-item
          v-for="(item,index) in sliderList"
          :key="'slider-list-'+index"
        >
          <div
            class="slider-body"
            @click="handleGoToArticleContent(item.url)"
          >
            <img
              :src="item.picUrl"
              :alt="item.title"
            >
            <div class="text">
              <h2 class="title">
                {{ item.title }}
              </h2>
              <div class="info">
                <img
                  :src="WeixinIcon"
                  alt="微信图标"
                >
                <h3 class="desc">
                  {{ item.userName }}
                </h3>
              </div>
            </div>
          </div>
        </van-swipe-item>>
      </van-swipe>
    </div>

    <Card
      v-for="(item, index) in cardList"
      :key="'article-list-'+index"
      dis-hover
    >
      <div
        class="scroll-body"
        @click="handleGoToArticleContent(item.url)"
      >
        <div class="left">
          <img
            :src="item.picUrl"
            :alt="item.title"
          >
        </div>
        <div class="right">
          <h3 class="title">
            {{ item.title }}
          </h3>
          <div class="second">
            {{ item.userName }}|   {{ require('moment')(item.ctime).fromNow() }}
          </div>
        </div>
      </div>
    </card>
    <div
      id="loadMore"
      class="loadMore"
      @click="handleReachBottom"
    >
      {{ !lock? '加载中...' : '加载更多...' }}
    </div>
  </div>
</template>

<script>
import { getWxNew } from '@/api/article'
import WeixinIcon from '_icon/weixin.png'
export default {
  name: 'ArticleList',
  data: () => ({
    WeixinIcon,
    sliderIndex: 0,
    page: 1,
    num: 10,
    typeid: 3,
    height: window.innerHeight - 50,
    articleList: [],
    lock: false
  }),
  computed: {
    sliderList () {
      const max = this.articleList.length >= 5 ? 5 : this.articleList.length
      return this.articleList.slice(0, max)
    },
    cardList () {
      return this.articleList.length >= 5 ? this.articleList.slice(5, this.articleList.length) : []
    }
  },
  mounted () {
    const that = this
    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 50
    })
    window.addEventListener('scroll', function () {
      const body = document.getElementById('layout')
      const clientHeight = document.body.clientHeight
      const scrollTop = body.scrollTop
      const scrollHeight = body.scrollHeight
      if (clientHeight + scrollTop + 300 >= scrollHeight && !that.lock) {
        that.lock = true
        that.handleReachBottom()
      }
    }, true)
    this._getWxNews()
  },
  methods: {
    _getWxNews () {
      getWxNew({
        num: this.num,
        page: this.page,
        typeid: this.typeid
      }).then(res => {
        if (res.status === 200) {
          const data = res.data
          if (data.code === 200) {
            this.articleList.push(...data.newslist)
            this.page++
          } else {
            throw new Error()
          }
        } else {
          throw new Error()
        }
      }).catch(() => {
        this.$Message.error('请求异常')
      }).finally(() => {
        this.lock = false
      })
    },
    handleReachBottom () {
      this._getWxNews()
    },
    handleGoToArticleContent (url) {
      this.$router.push({
        name: 'article-content',
        query: {
          wxUrl: url
        }
      })
    }
  }
}
</script>

<style lang="less" >
@import '~/src/index.less';
.article-list-container{
  width: 100%;
  overflow: hidden;
  .slider{
    box-sizing: border-box;
    padding: .5rem;
  }
  .loadMore{
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    color:@themeColor;
    font-size: 1rem;
    padding: .5rem .5rem 3rem;
  }
}

.textStyle(){
      color: white;
      text-shadow: 1px 1px 0px black;
      z-index: 101;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.slider-body{
  width: 100%;
  height: 170px;
  overflow: hidden;
  border-radius: .5rem;
  position: relative;
  img{
    width: 100%;
    z-index: 100;
  }
  .text{
    position: absolute;
    bottom: 1.5rem;
    right: 1rem;
    max-width: 20rem;
    .title{
        .textStyle()
    }
    .info{
      text-align: right;
      margin-top: .5rem;
      img{
        width: 1rem;
      }
      .desc{
        display: inline-block;
        .textStyle();
      }
    }
  }
}

.scroll-body{
  .flex(row,space-between,space-around);
  .left{
    width: 10rem;
    max-height: 100px;
    border-radius: .5rem;
    overflow: hidden;
    height: 100%;
    .flex(row,center,center);
    img{
        width: 10rem;
    }
  }
  .right{
    margin-left: 1rem;
    flex: 1;
    height: 100%;
    .flex(column,flex-start,flex-start);
    .title{
      .textStyle();
      color: #666;
      text-shadow: none !important;
    }
    .second{
      .textStyle();
      color:#666;
      text-shadow: none !important;
    }
  }

}
</style>
