<template>
  <div class="user-info-items-wrapper">
    <menu-item
      v-if="userInfo.identity === 0"
      :icon="PhoneIcon"
      title="手机号码"
      :separate-line="true"
      :value="userInfo.phoneNumber"
    />
    <menu-item
      v-if="userInfo.identity === 0"
      :icon="CalendarIcon"
      title="出生日期"
      :separate-line="true"
      :value="typeof userInfo.birthday === 'number' ? require('moment')(userInfo.birthday).format('YYYY-MM-DD') : userInfo.birthday"
    />
    <menu-item
      v-if="userInfo.identity === 0"
      :icon="AgeIcon"
      title="年龄"
      :value="userInfo.age"
    />
    <menu-item
      v-if="userInfo.identity === 1"
      title="擅长"
      :value="userInfo.skill"
      :vertical="true"
      :separate-line="true"
    />
    <menu-item
      v-if="userInfo.identity === 1"
      title="简介"
      :value="userInfo.introduction"
      :vertical="true"
    />
    <div class="second">
      <menu-item
        :icon="KeyIcon"
        title="修改密码"
      >
        <img
          class="inset-img"
          :src="RightArrowIcon"
          alt="operation"
          @click="navigateToResetPassword"
        >
      </menu-item>
      <menu-item
        :icon="EditIcon"
        title="编辑信息"
      >
        <img
          class="inset-img"
          :src="RightArrowIcon"
          alt="operation"
          @click="editInfo"
        >
      </menu-item>
      <menu-item
        v-if="userInfo.identity === 0"
        :icon="QQIcon"
        title="绑定QQ"
      >
        <div
          v-if="userInfo.qqNumber !== ''"
          class="bound"
        >
          已绑定
        </div>
        <img
          v-else
          class="inset-img"
          :src="RightArrowIcon"
          alt="operation"
          @click="goToBindQQ"
        >
      </menu-item>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/components/menuItem'
import PhoneIcon from '_icon/phone.png'
import QQIcon from '_icon/qq-fill.png'
import CalendarIcon from '_icon/calendar.png'
import AgeIcon from '_icon/age.png'
import RightArrowIcon from '_icon/rightArrow.png'
import KeyIcon from '_icon/key.png'
import EditIcon from '_icon/edit.png'
export default {
  name: 'UserInfoItems',
  components: {
    MenuItem
  },
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    PhoneIcon,
    QQIcon,
    CalendarIcon,
    AgeIcon,
    RightArrowIcon,
    KeyIcon,
    EditIcon
  }),
  computed: {
    qqBindUrl () {
      return this.$config.qqBindUrl
    }
  },
  methods: {
    navigateToResetPassword () {
      this.$router.push({
        name: 'resetPassword'
      })
    },
    editInfo () {
      this.$emit('on-show-modal')
    },
    goToBindQQ () {
      window.open(this.qqBindUrl, '_self')
    }
  }
}
</script>

<style lang="less">
@import '~/src/index.less';
.user-info-items-wrapper {
  width: 100%;
  margin-top: 20px;

  .second {
    margin-top: 10px;
  }

  .inset-img {
    width: 30px;
    height: 30px;
  }
}

.bound{
  color: @themeColor;
  font-size: 1rem;
}
</style>
