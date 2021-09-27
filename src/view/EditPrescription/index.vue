<template>
  <div class="edit-prescription-container">
    <template v-if="hasEnd">
      <div class="hasEnd">
        您已经结束此次签约的处方，如果需要创建新处方，请重新签约。
      </div>
    </template>
    <template v-else>
      <Header :name="name+':'+ (prescription.title || '无')" />
      <div class="body">
        <div class="first">
          <input-item
            title="处方名"
            :disabled="prescription.state !== 1"
            :value="prescription.title"
            @on-change-value="(value) => changeValue('title', value)"
          />
        </div>

        <Card class="healthItemList">
          <p slot="title">
            {{ prescription.state !== 1? '':'选择' }}健康信息
          </p>
          <CheckboxGroup
            v-model="checkAllGroup"
          >
            <Checkbox
              v-for="(item,index) in healthItemList"
              :key="'healthItem-'+index"
              :disabled="prescription.state !== 1"
              :label="index+1"
              class="checkbox"
            >
              {{ item.name }}
            </Checkbox>
          </CheckboxGroup>
        </Card>
        <div class="third first">
          <input-item
            title="提交周期"
            type="select"
            :disabled="prescription.state !== 1"
            :value="prescription.period"
            :range="periodList"
            @on-change-value="(value) => changeValue('period', parseInt(value))"
          />
        </div>
        <!-- 疗程 -->
        <Card
          v-for="(stage,index) in prescription.stage"
          :key="'stage'+index"
          class="stages"
        >
          <p slot="title">
            疗程: {{ stage.title || '暂无' }}
          </p>

          <input-item
            title="疗程名"
            :disabled="prescription.state !== 1 || !!stage.deleteTime"
            :value="stage.title"
            @on-change-value="(value) => changeStage(index,'title', value)"
          />
          <input-item
            type="textarea"
            :disabled="prescription.state !== 1 || !!stage.deleteTime"
            place-holder="请输入疗程内容"
            :value="stage.content"
            @on-change-value="(value) => changeStage(index,'content', value)"
          />
          <div
            v-if="prescription.state === 1 && !stage.deleteTime"
            class="operate"
          >
            <Button
              v-if="index === 0 || prescription.stage[index-1].deleteTime"
              type="warning"
              class="button"
              ghost
              @click="openEndStageModal(index)"
            >
              结束疗程
            </Button>
            <Button
              v-if="!stage.id"
              type="error"
              ghost
              class="button"
              @click="openDeleteStageModal(index)"
            >
              删除疗程
            </Button>
          </div>
        </Card>
        <div
          v-if="prescription.state === 1"
          class="add"
          @click="addStage"
        >
          添加新疗程...
        </div>
        <div class="disease first">
          <input-item
            title="网诊"
            :disabled="prescription.state !== 1"
            :value="prescription.possibleDisease"
            @on-change-value="(value) => changeValue('possibleDisease', value)"
          />
        </div>
        <Button
          v-if="prescription.state === 1"
          type="primary"
          class="updateBtn"
          @click="updatePrescription"
        >
          更新处方
        </Button>
        <Button
          v-if="prescription.state === 1 &&
            !!prescription.stage[prescription.stage.length - 1].deleteTime"
          type="primary"
          class="endBtn"
          @click="openEndPrescriptionModal"
        >
          归结处方
        </Button>
        <Button
          v-if="prescription.state === 1"
          type="error"
          class="cancelBtn"
          @click="openDeletePrescriptionModal"
        >
          删除处方
        </Button>
      </div>
      <Modal
        v-model="isOpenEndStageModal"
        title="结束疗程"
        @on-ok="endStage(modalConnectStageIndex)"
      >
        <p>
          您确定要结束【{{ modalConnectStageIndex >=0 && prescription.stage[modalConnectStageIndex] ?
            prescription.stage[modalConnectStageIndex].title : '' }}】疗程吗?
        </p>
      </Modal>
      <Modal
        v-model="isOpenDeleteStageModal"
        title="删除疗程"
        @on-ok="deleteStage(modalConnectStageIndex)"
      >
        <p>
          您确定要删除【{{ modalConnectStageIndex >=0 && prescription.stage[modalConnectStageIndex] ?
            prescription.stage[modalConnectStageIndex].title : '' }}】疗程吗?
        </p>
      </Modal>
      <Modal
        v-model="isOpenEndPrescriptionModal"
        title="归结处方"
        @on-ok="endPrescription"
      >
        <p>
          您确定要归结【{{ prescription.title }}】处方吗，此操作无法撤销。
        </p>
      </Modal>
      <Modal
        v-model="isOpenDeletePrescriptionModal"
        title="删除疗程"
        @on-ok="deletePrescription"
      >
        <p>
          您确定要删除【{{ prescription.title }}】处方吗，此操作无法撤销。
        </p>
      </Modal>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import InputItem from '@/components/inputItem'
import Header from './components/Header.vue'
export default {
  name: 'EditPrescription',
  components: {
    Header,
    InputItem
  },
  props: {
    userId: {
      type: Number,
      default: -1
    },
    doctorId: {
      type: Number,
      default: -1
    },
    windowId: {
      type: Number,
      default: -1
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hasEnd: false,
      waitSendInformationList: [],
      isOpenEndStageModal: false,
      isOpenDeleteStageModal: false,
      isOpenEndPrescriptionModal: false,
      isOpenDeletePrescriptionModal: false,
      modalConnectStageIndex: -1,
      prescription: {},
      healthItemList: [],
      checkAllGroup: [],
      state: -1,
      periodList: [
        {
          value: 1,
          label: '一天一次'
        },
        {
          value: 3,
          label: '三天一次'
        },
        {
          value: 7,
          label: '一周一次'
        },
        {
          value: 15,
          label: '半月(15天)一次'
        }, {
          value: 30,
          label: '一月(30天)一次'
        }
      ]
    }
  },
  mounted () {
    this._getPrescriptionDetail()
  },
  methods: {
    sendMessage (data) {
      this.$socket.emit('sendMessage', {
        senderId: this.$store.state.user.id,
        receiveId: parseInt(this.userId),
        content: data,
        windowId: this.windowId
      })
    },
    // 更新处方
    async updatePrescription () {
      const _stage = this.prescription.stage.reduce(function (prev, cur, index) {
        cur.createTime = moment(cur.createTime).format('YYYY-MM-DD HH:mm:ss')
        if (cur.deleteTime) {
          cur.deleteTime = moment(cur.deleteTime).format('YYYY-MM-DD HH:mm:ss')
        }
        prev.push(cur)
        return prev
      }, [])
      const _data = {
        userId: parseInt(this.userId),
        state: parseInt(this.prescription.state),
        prescriptionId: parseInt(this.prescription.id),
        title: this.prescription.title,
        healthItem: this.checkAllGroup,
        possibleDisease: this.prescription.possibleDisease,
        period: parseInt(this.prescription.period),
        stage: _stage
      }
      const res = await this.$axios.doctor.updatePrescription(_data)
      if (res.status) {
        this.waitSendInformationList.push({
          type: 'info',
          data: `您的【${this.prescription.title}】处方发生更新，请查看您的处方。`
        })
        this.$Message.success('更新成功')
        this.waitSendInformationList.forEach(element => {
          this.sendMessage(JSON.stringify(element))
        })
      }
    },
    endPrescription () {
      this.prescription.state = 0
      this.waitSendInformationList.push({
        type: 'info',
        data: `您的【${this.prescription.title}】处方已结束，请查看您的处方。`
      })
      this.updatePrescription()
    },
    deletePrescription () {
      this.prescription.state = 2
      this.waitSendInformationList.push({
        type: 'info',
        data: `您的【${this.prescription.title}】处方已取消，请查看您的处方。`
      })
      this.updatePrescription()
    },
    openEndStageModal (index) {
      this.modalConnectStageIndex = index
      this.isOpenEndStageModal = true
    },
    openDeleteStageModal (index) {
      this.modalConnectStageIndex = index
      this.isOpenDeleteStageModal = true
    },
    openDeletePrescriptionModal () {
      this.isOpenDeletePrescriptionModal = true
    },
    openEndPrescriptionModal () {
      this.isOpenEndPrescriptionModal = true
    },
    // 添加新疗程
    addStage () {
      this.prescription.stage.push({
        content: '',
        createTime: moment().valueOf(),
        title: ''
      })
    },
    // 结束疗程
    endStage (index) {
      this.waitSendInformationList.push({
        type: 'info',
        data: `您的【${this.prescription.title}】处方的【${this.prescription.stage[index].title}】疗程已完成，请查看您的处方。`
      })
      this.prescription.stage.splice(index, 1, {
        ...this.prescription.stage[index],
        deleteTime: moment().valueOf()
      })
      this.modalConnectStageIndex = -1
    },
    // 删除疗程
    deleteStage (index) {
      this.prescription.stage.splice(index, 1)
      this.modalConnectStageIndex = -1
    },
    // 获取详细信息
    async _getPrescriptionDetail () {
      const res = await this.$axios.home.getPrescriptionDetail({
        userId: this.userId,
        doctorId: this.doctorId
      })
      if (res.status) {
        if (res.data.length === 0 || Object.keys(res.data).length === 0) {
          this.hasEnd = true
        } else {
          this.prescription = res.data
          this._getHealthItem()
        }
      } else {
        this.hasEnd = true
      }
    },
    async _getHealthItem () {
      const res = await this.$axios.user.getHealthItem()
      if (res.status) {
        this.healthItemList = res.data.itemList
        this.checkAllGroup = this.prescription.healthItemList.reduce(
          (prev, cur) => {
            const index = this.healthItemList.findIndex(
              (healthItem) => healthItem.name === cur
            )
            if (index !== -1) {
              prev.push(index + 1)
              return prev
            }
            return prev
          }, [])
      }
    },
    changeValue (key, value) {
      this.prescription[key] = value
    },
    changeStage (index, key, value) {
      this.prescription.stage[index][key] = value
    }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
@space:.5rem;
.edit-prescription-container{
    width: 100%;
    .hasEnd{
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      margin-top: 3rem;
      font-weight: bold;
      color: @fadeColor;
      padding: 2rem;
      font-size: 1.2rem;
    }
    .body{
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        .first{
          background-color: white;
          padding: .5rem 1rem;
          border-radius: .5rem;
          box-shadow: @boxShadow;
          margin-bottom: @space;
          .input-item-wrapper:last-child{
            margin-bottom: -0.5rem;
          }
        }
        .healthItemList{
          border-radius: .5rem;
          box-shadow: @boxShadow;
        }
        .stages{
          border-radius: .5rem;
          box-shadow: @boxShadow;
          margin-bottom: @space;
          .operate{
            margin-top: .5rem;
            width: 100%;
            .flex(row,flex-end,center);
            .button{
              border: none;
              border-radius: 0px;
            }
          }
        }
        .add{
          width: 100%;
          text-align: center;
          color: @themeColor;
        }
        .third{
          margin-top: @space;
        }
        .disease{
          margin-top: @space;
        }
        .endBtn{
          width: 100%;
           margin-top: @space;
        }
        .cancelBtn,.updateBtn{
          margin-top: @space;
          width: 100%;
        }
    }
}
.checkbox{
   margin: .5rem;
}
</style>
