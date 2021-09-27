<template>
  <div>
    <Row
      type="flex"
      align="middle"
      class="header"
    >
      <Col
        span="4"
        offset="1"
      >
        <router-link :to="{'name':'list'}">
          <img :src="LeftArrowIcon" />
        </router-link>
      </Col>
      <Col span="15">
        <p class="chatTitle">
          {{ this.article.title }}
        </p>
      </Col>
    </Row>
    <div
      class="articleContent"
      v-html="this.article.content"
    ></div>
    <!-- <iframe :src="this.article.url" frameborder="0"></iframe> -->
  </div>
</template>
<script>
import LeftArrowIcon from '_icon/left-arrow.png'
export default {
  name: 'Content',
  data () {
    return {
      article: this.$route.query.article,
      LeftArrowIcon
    }
  },
  methods: {
    // var showImg = function (url) {
    //     var frameid = 'frameimg' + Math.random();
    //     window.img = '<img id="img" src=\'' + url + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script>';
    //     return '<iframe id="' + frameid + '" src="javascript:parent.img;" frameBorder="0" scrolling="no" width="100%"></iframe>';
    // }
  }
}
</script>
<style lang="less" scoped>
@import '~/src/index.less';
.header{
    position: fixed;
    top:6.5vh;
    background-color: white;
    box-shadow: @boxShadow;
    padding: 0.5em 0;
    img{
        width: 45px;
        height: 45px;
    }
    .chatTitle{
        text-align: center;
        font-size: @secondSize;
    }
}
.articleContent{
    margin-top:10vh;
    padding: 1em;
}
</style>
