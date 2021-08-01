<template>
  <div
    :id="'card-folder-item-container-'+index"
    :style="{
      height:cardHeight + 'px'
    }"
    class="card-folder-item-container"
    @click="handleCardClick"
  >
    <slot
      :index="index"
      :data="data"
    />
  </div>
</template>

<script>
export default {
  name: 'CardFolderItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    data: {
      type: [String, Object],
      default: ''
    },
    // eslint-disable-next-line vue/prop-name-casing
    'card-height': {
      type: Number,
      default: 160
    }
  },
  methods: {
    handleCardClick () {
      this.$emit('on-click')
    }
  }
}
</script>

<style lang='less' scoped>
@import '~/src/index.less';
.card-folder-item-container{
    width: 100%;
    background-color: white;
    box-shadow: 0px 0px 10px 0px #999;;
    border: none;
    border-radius: .8rem;
    overflow: hidden;
    .title{
       font-size: .8rem;
       line-height: 2rem;
       padding: .3rem 1rem;
    }
    .body{

    }
}
</style>
