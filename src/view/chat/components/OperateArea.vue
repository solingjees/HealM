<template>
  <div class="inputPart">
    <div class="function-area">
      <router-view
        :is-assigned="isAssigned"
        :opponent-id="opponentId"
        :message-list="messageList"
      ></router-view>
    </div>
    <Row
      class="input-line"
      type="flex"
      align="middle"
    >
      <Col
        flex="auto"
        class="input-area"
      >
        <Input
          v-model="inputText"
          class="input"
          :border="false"
          placeholder="请输入内容"
          @on-focus="changeEmojiSelect(false)"
        />
      </Col>
      <Col
        flex="2.5rem"
        class="emoji"
      >
        <div
          class="emojiButton"
          @click="changeEmojiSelect()"
        >
          😀</a>
        </div>
      </Col>
      <Col flex="3rem">
        <Button
          type="primary"
          @click="sendMessage()"
        >
          发送
        </Button>
      </Col>
    </Row>
    <transition name="emoji-transition">
      <div
        v-if="showEmoji"
        class="browBox"
      >
        <ul>
          <!--生成对应的表情包-->
          <li
            v-for="(item, index) in faceList"
            :key="index"
          >
            <div @click="getBrow(index)">
              {{ item }}
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import EmoijJson from '@/assets/emoji.json'
export default {
  name: 'OperateArea',
  props: {
    reset: {
      type: Number,
      default: 0
    },
    isAssigned: {
      type: Boolean,
      default: false
    },
    opponentId: {
      type: Number,
      default: -1
    },
    messageList: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    EmoijJson,
    inputText: '',
    showEmoji: false
  }),
  computed: {
    faceList () {
      const keys = Object.keys(this.EmoijJson)
      const arr = []
      for (const keyItem of keys) {
        arr.push(this.EmoijJson[keyItem].char)
      }
      return arr
    }
  },
  watch: {
    showEmoji (newval, oldval) {
      if (newval === oldval) return
      if (newval) {
        this.$emit('onInputClick')
      }
    },
    reset (newval, oldval) {
      if (newval !== oldval) {
        this.closeMorePart()
      }
    }
  },
  methods: {
    closeMorePart () {
      this.showEmoji = false
    },
    changeEmojiSelect (newEmojiState) {
      if (typeof newEmojiState === 'undefined') {
        this.showEmoji = !this.showEmoji
      } else {
        this.showEmoji = newEmojiState
      }
    },
    getBrow (index) {
      this.inputText += this.faceList[index]
    },
    sendMessage () {
      if (this.inputText.trim() === '') {
        this.$Message.error('发送内容不得为空')
        return
      }
      this.$emit('sendMessage', JSON.stringify({
        type: 'info',
        data: this.inputText
      }))
      this.inputText = ''
    }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
.inputPart{
     width: 100%;
     box-sizing: border-box;
    .input-line{
        padding: 0.5rem;
        width: 100%;
        box-sizing: border-box;
        background-color: rgb(243,244,245);
        border-top: 1px solid #efefef;
        font-size:@thirdSize;
        .emoji{
          .flex(row,center,center);
          .emojiButton{
            font-size: 1.5rem;
          }
        }
        .input-area{
            input{
             border-radius: 3rem;
             padding:1rem !important;
           }
        }

    }
    .function-area{
      width: 100%;
    }

    .moreOperateButton{
        margin-left:0.2em;
        img{
            width: 1.5em;
        }
    }
    .browBox{
        border-top: 1px solid #fff;
        margin-top: 0.5em;
        overflow: hidden;
        height: 22rem;
        li{
            float: left;
            padding:0.2em 0.2em;
            width: 10%;
            text-align: center;
            div{
              font-size: 1.5rem;
              border-radius: .5rem;
              &:hover{
                background:@thirdColor;
              }
            }
        }
    }
}

.emoji-transition-enter{
   height: 0px !important;
}
.emoji-transition-enter-active {
  transition: height .3s ease;
}
.emoji-transition-enter-to{
   height: 22rem !important;
}
</style>
