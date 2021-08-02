<template>
  <div class="info-display-template-wrapper">
    <my-word
      v-if="healthItemAttr && parseInt(healthItemAttr.type) === 0"
      :health-item-attr="healthItemAttr"
      :record-data="recordData"
      :index="index"
    />
    <my-picture
      v-if="healthItemAttr && parseInt(healthItemAttr.type) === 1"
      :health-item-attr="healthItemAttr"
      :record-data="recordData"
      :index="index"
      :date="date"
    />
    <my-area
      v-if="healthItemAttr && parseInt(healthItemAttr.type) === 2"
      :health-item-attr="healthItemAttr"
      :record-data="recordData"
      :index="index"
      :date="date"
    />
    <my-pie
      v-if="healthItemAttr && parseInt(healthItemAttr.type) === 3"
      :health-item-attr="healthItemAttr"
      :record-data="recordData"
      :index="index"
      :date="date"
    />
    <my-line
      v-if="healthItemAttr && parseInt(healthItemAttr.type) === 4"
      :health-item-attr="healthItemAttr"
      :record-data="recordData"
      :index="index"
      :date="date"
    />
  </div>
</template>

<script>
import Word from './templates/word.vue'
import Area from './templates/area.vue'
import Line from './templates/line.vue'
import Pie from './templates/pie.vue'
import Picture from './templates/picture.vue'
export default {
  name: 'InfoDisplayTemplate',
  components: {
    'my-word': Word,
    'my-area': Area,
    'my-line': Line,
    'my-pie': Pie,
    'my-picture': Picture
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
  }
}
</script>

<style lang="less" scoped>
.info-display-template-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 2rem;
}
</style>
