<template>
  <div class="search-result-container">
    <div class="operate">
      <Button
        type="primary"
        @click="goToSearch"
      >
        搜索
      </Button>
    </div>
    <template v-if="doctorList.length > 0">
      <doctor-card
        v-for="(doctorItem,index) in doctorList"
        :key="'doctor-item-'+index"
        :item-data="doctorItem"
      >
      </doctor-card>
    </template>
    <div
      v-if="doctorList.length === 0"
      class="noData"
    >
      <hr /> <span>{{ searching? '搜索中' :'暂无数据' }}</span> <hr />
    </div>
  </div>
</template>

<script>
import DoctorCard from './components/DoctorCard.vue'
export default {
  name: 'SearchResult',
  components: {
    DoctorCard
  },
  props: {
    department: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    doctorList: [],
    searching: false
  }),
  mounted () {
    this.searchDoctor()
  },
  methods: {
    async searchDoctor () {
      this.searching = true
      const res = await this.$axios.user.searchDoctor({
        departmentName: this.department
      })
      this.searching = false
      if (res.status) {
        this.doctorList = res.data
      }
    },
    goToSearch () {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~/src/index.less';
.search-result-container{
    width: 100%;
    box-sizing: border-box;
    .operate{
        width: 100%;
        box-sizing: border-box;
        padding: .5rem;
    }
    .noData{
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        .flex(row,center,center);
        font-size: 1rem;
        color: @fadeColor;
        hr{
            flex: 1;
            height: 1px;
            border: none;
            background-color: #cdcdcd;
        }
        span{
            margin: 0rem 1rem;
        }
    }
}
</style>
