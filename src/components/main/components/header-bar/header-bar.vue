<template>
  <div class="header-bar">
    <div class="left">
      <sider-trigger
        :collapsed="collapsed"
        icon="md-menu"
        @on-change="handleCollpasedChange"
      />
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="right-icon">
      <img
        :src="LogoIcon"
        alt="logo"
        @click="goToAbout"
      >
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import LogoIcon from '_images/logo.png'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger
  },
  props: {
    collapsed: Boolean
  },
  data: () => ({
    LogoIcon
  }),
  computed: {
    title () {
      if (this.$route.meta.title instanceof Function) {
        return this.$route.meta.title(this.$route) || ''
      } else {
        return this.$route.meta.title || ''
      }
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    },
    goToAbout () {
      this.$router.push({
        name: 'about'
      })
    }
  }
}
</script>
