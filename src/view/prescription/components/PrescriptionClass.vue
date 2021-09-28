<template>
  <div class="prescription-class-container">
    <div class="title-line">
      <div
        class="title"
        :style="{
          color:titleColor
        }"
      >
        {{ title }}
      </div>
      <hr>
    </div>
    <Collapse
      v-model="displayPanelName"
      accordion
    >
      <Panel
        v-for="(prescriptionItem,index) in prescriptionList"
        :key="'prescription-item-'+index"
        :name="index + ''"
        class="prescription-item-container"
        :class="{
          cancelled: prescriptionItem.state === 2
        }"
        hide-arrow
      >
        <div class="header">
          <div class="left">
            <!-- <Badge
              v-if="prescriptionItem.state ===1 && prescriptionItem.notUploadHealthItem.length > 0"
              class="badge"
              text="数据不完整"
            /> -->
            <div class="title">
              {{ prescriptionItem.title }}
            </div>
            <div class="doctor">
              [{{ prescriptionItem.doctorName }}]
            </div>
          </div>
          <div
            class="disease right"
            :class="{
              finished:prescriptionItem.state === 0,
              running: prescriptionItem.state === 1,
              cancelled: prescriptionItem.state === 2
            }"
          >
            {{ prescriptionItem.possibleDisease }}
          </div>
          <img
            v-if="!isEnd"
            :src="rightArrow"
            alt="go"
            @click="goToPrescriptionDetail(prescriptionItem.id,prescriptionItem.doctorId)"
          />
        </div>
        <p slot="content">
          <ItemContent
            :data="prescriptionItem"
            :badge-color="
              prescriptionItem.state === 0 ? 'blue':
              (prescriptionItem.state === 1 ? 'green' : 'red'
              )"
          ></ItemContent>
        </p>
      </panel>
    </collapse>
  </div>
</template>

<script>
import RightArrow from '_icon/rightArrow.png'
import ItemContent from './PrescriptionItemContent.vue'
export default {
  name: 'PrescriptionClass',
  components: {
    ItemContent
  },
  props: {
    prescriptionList: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: '#aaa'
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    displayPanelName: '',
    rightArrow: RightArrow
  }),
  methods: {
    goToPrescriptionDetail (pid, did) {
      this.$router.push({
        name: 'prescriptionDetail',
        query: {
          pid,
          did
        }
      })
    }
  }
}
</script>

<style lang='less'>
@import '~/src/index.less';
.prescription-class-container{
    width:100%;
    .ivu-collapse{
    background:none;
    border: none;
    border-radius: .5rem;
    .ivu-collapse-item{
        background-color: white;
        box-shadow: @boxShadow;
        border-radius: .5rem;
        margin-bottom: .5rem;
        overflow: hidden;
        .ivu-collapse-header{
            height: 3rem;
            line-height: 3rem;
        }
    }
}
    .title-line{
      margin-top: .5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      margin-bottom: 1rem;
      .title{
          color: @titleColor;
          font-size: 1rem;
      }
      hr{
        background-color: #cdcdcd;
        border: none;
        height: 1px;
      }
    }
    .prescription-item-container{
        &.cancelled{
            background-color: rgb(232, 232, 232);
        }
        .header{
          box-sizing: border-box;
          .flex(row,space-between,center);
          height: 3rem;
          line-height: 3rem;
          width: 100%;
          .left{
            height: 100%;
            .badge{
                margin-right: .3rem;
            }
            .flex(row,flex-start,center);
            .title{
                color:@titleColor;
                font-size: 1rem;
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .doctor{
                white-space: nowrap;
            }
          }
          .right{
            flex: 1;
            text-align: right;
            padding-left: 1rem;
            padding-right: .5rem;
            &.disease{
              &.running{
                color:rgb(227,130,74);
              }
              &.finished{
                color:@fadeColor;
              }
              &.cancelled{
                  color:white;
              }
            }
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
             img{
                 width: 2rem;
             }
          }
        }
}

</style>
