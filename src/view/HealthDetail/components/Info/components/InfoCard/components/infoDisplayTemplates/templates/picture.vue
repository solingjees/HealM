<template>
  <div class="dataDisplay">
    <template v-if="index !== -1">
      <CardFolder
        class="card-folder"
        :card-height="300"
        :data-list="currentData.data"
        :index="0"
      >
        <template
          v-slot="{ index: innerIndex, data}"
        >
          <div class="container">
            <div class="title">
              第{{ innerIndex + 1 }}张{{ healthItemAttr.name }}图片
            </div>
            <hr>
            <div class="body">
              <img
                :src="data"
                :alt="'第'+ innerIndex + 1+'张'+healthItemAttr.name+'图片'"
              >
            </div>
          </div>
        </template>
      </cardfolder>
    </template>
    <template
      v-else
    >
      <div id="noData">
        暂无数据
      </div>
    </template>
  </div>
  </div>
</template>

<script>
import CardFolder from '@/components/CardFolder'

export default {
  name: 'InfoDisplayTemplatePicture',
  components: {
    CardFolder
  },
  props: {
    healthItemAttr: {
      type: Object,
      default: () => ({})
    },
    recordData: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: -1
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentData () {
      return this.recordData[this.index]
    }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
.dataDisplay {
    width: 100%;
    transition: all .2s;
    height: fit-content;
    padding-top: 1rem;
    .flex(column,center,center);
    #noData {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        color: @secondColor;
    }
    .card-folder{
        transition: all .2s;
    }

}
 .container{
    width:100%;
    height: 100%;
    .title{
        font-size: 1rem !important;
        color: @titleColor;
    }
    .body{
        width: 100%;
        height: fit-content;
        img{
          width: 100%;
        }
    }
    hr{
      background-color: @thirdColor;
      border:none;
      height: 1px;
    }
}
</style>
