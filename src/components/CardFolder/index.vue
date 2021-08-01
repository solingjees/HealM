<template>
  <div
    class="card-folder-container"
    :style="{
      height: height + 'px'
    }"
  >
    <CardFolderItem
      :ref="'first-item-'+index"
      class="first-item"
      :index="index"
      :card-height="cardHeight"
      :data="dataList[0]"
      @on-click="handleClick"
    >
      <template v-slot="{ index: innerIndex,data }">
        <slot
          :index="innerIndex"
          :data="data"
        />
      </template>
    </CardFolderItem>
    <Card-Folder
      v-if="dataList.length > 1"
      :index="index + 1"
      :data-list="dataList.slice(1)"
      class="next-folder"
      :style="{
        top: showFirstCard? '16px': ( 50 - cardHeight) + 'px'
      }"
    >
      <template v-slot="{ index: innerIndex,data }">
        <slot
          :index="innerIndex"
          :data="data"
        />
      </template>
    </Card-Folder>
  </div>
</template>
<script>
import CardFolderItem from '@/components/CardFolder/CardFolderItem'
import CardFolder from '@/components/CardFolder'
export default {
  name: 'CardFolder',
  components: {
    CardFolderItem,
    CardFolder
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    // eslint-disable-next-line vue/prop-name-casing
    'data-list': {
      type: Array,
      default: () => ([])
    },
    // eslint-disable-next-line vue/prop-name-casing
    'card-height': {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    showFirstCard: false,
    nextFolderHeight: 0
  }),
  computed: {
    // eslint-disable-next-line no-return-assign
    height () {
      if (this.showFirstCard || this.dataList.length === 1) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.$parent.nextFolderHeight = this.cardHeight + this.nextFolderHeight + 16
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.$parent.nextFolderHeight = this.nextFolderHeight + 50
      }
    }
  },
  watch: {
    dataList (newval, oldval) {
      if (newval.length !== oldval.length) {
        this.nextFolderHeight = 0
      }
    }
  },
  methods: {
    handleClick () {
      this.showFirstCard = !this.showFirstCard
    }
  }
}
</script>

<style lang='less' scoped>
.card-folder-container{
    width: 100%;
    .card-folder-item{
        width: 100%;
    }
    .next-folder{
        position: relative;
        width: 100%;
        transition: all .2s;
    }
}
</style>
