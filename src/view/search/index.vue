<template>
  <div
    class="search-container"
    :style="{
      'height': (100 * vh - 50) + 'px'
    }"
  >
    <Floor
      class="
    floor"
      :data-list="Object.keys(departmentList)"
      :floor-item="floorItem"
      @on-change="handleFloorChange"
    >
    </Floor>
    <Ceil
      class="ceil"
      :index="ceilIndex"
      :data-list="departmentList[floorItem]"
      @on-change="handleCeilChange"
    ></Ceil>
  </div>
</template>

<script>
import Floor from './components/floor.vue'
import Ceil from './components/ceil.vue'
export default {
  name: 'Search',
  components: {
    Floor,
    Ceil
  },
  data: () => ({
    floorItem: '',
    ceilIndex: -1,
    vh: window.innerHeight * 0.01
  }),
  computed: {
    departmentList () {
      return this.$config.departments
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01
    })
  },
  methods: {
    handleFloorChange (item) {
      this.floorItem = item
      this.ceilIndex = -1
    },
    handleCeilChange (index) {
      this.ceilIndex = index
      this.$router.push({
        name: 'searchResult',
        query: {
          department: this.departmentList[this.floorItem][this.ceilIndex]
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.search-container{
    .flex(row,center,center);
    width: 100%;
    position: fixed;
    top: 50px;
    left: 0px;
    background-color: white;
}
</style>
