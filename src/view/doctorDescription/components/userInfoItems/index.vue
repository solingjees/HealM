<template>
  <div class="user-info-items-wrapper">
    <menu-item
      title="擅长"
      :value="userInfo.skill"
      :vertical="true"
      :separate-line="true"
    />
    <menu-item
      title="简介"
      :value="userInfo.introduction"
      :vertical="true"
      :separate-line="true"
    />
    <menu-item
      title="最近诊疗"
      :value="userInfo.recentRelateUser+'人'"
    />
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
  methods: {
    navigateToResetPassword () {
      this.$router.push({
        name: 'resetPassword'
      })
    },
    editInfo () {
      this.$emit('on-show-modal')
    }
  }
}
</script>

<style lang="less">
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
</style>
