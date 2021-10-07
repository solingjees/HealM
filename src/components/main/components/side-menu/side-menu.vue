<template>
  <div class="side-menu-wrapper">
    <slot />
    <Menu
      v-show="!collapsed"
      ref="menu"
      class="side-menu"
      :active-name="activeName"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-if="hasGetInfo">
        <template v-for="item in menuList">
          <menu-item
            :key="`menu-${item.name}`"
            class="menu-item"
            :name="item.name"
            :to="{ name: item.name }"
          >
            <div
              class="menu-item-wrapper"
              @click="closeSider"
            >
              <img
                class="menu-item-img"
                :src="require('/src/assets/images/iconfont/' + item.meta.icon)"
                :alt="item.meta.title"
              >
              <div class="menu-item-title">
                {{ item.meta.title }}
              </div>
            </div>
          </menu-item>
        </template>
        <div
          v-if="hasGetInfo"
          class="logout-container"
        >
          <div class="menu-item-wrapper">
            <img
              class="menu-item-img"
              :src="LogoutIcon"
              :alt="'退出'"
            >
            <div
              class="menu-item-title"
              @click="logout"
            >
              退出
            </div>
          </div>
        </div>
      </template>
    </Menu>
  </div>
</template>
<script>
import mixin from './mixin'
import LogoutIcon from '_icon/exit.png'

export default {
  name: 'SideMenu',
  mixins: [mixin],
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    hasGetInfo: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    LogoutIcon
  }),
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    logout () {
      this.closeSider()
      this.$emit('on-logout')
    },
    closeSider () {
      this.$emit('on-close')
    }
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
