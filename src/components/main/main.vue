<template>
  <Layout class="main">
    <Sider
      v-model="collapsed"
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="0"
      class="left-sider"
      :style="{ overflow: 'hidden' }"
    >
      <side-menu
        ref="sideMenu"
        accordion
        :active-name="$route.name"
        :collapsed="collapsed"
        :has-get-info="hasGetInfo"
        :menu-list="menuList"
        @on-select="turnToPage"
        @on-logout="logout"
        @on-close="closeSider"
      >
        <Blank />
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="user-info">
          <div v-if="hasGetInfo">
            <div
              class="user-info-content"
              @click="goToUserCenter"
            >
              <!-- 宽和高都至少100px-->
              <div class="avatar-wrapper">
                <img
                  :src="avatar"
                  alt="用户头像"
                >
              </div>
              <div class="user-info-word-group">
                {{ username }}
                <img
                  class="gender-img"
                  :src="
                    usergender === 1
                      ? require('/src/assets/images/iconfont/man.png')
                      : require('/src/assets/images/iconfont/woman.png')
                  "
                  alt="性别"
                >
              </div>
            </div>
          </div>
          <div v-else>
            <md-button
              class="md-raised md-primary login-button"
              @click="navigateToLogin"
            >
              登录 / 注册
            </md-button>
          </div>
        </div>
      </side-menu>
    </Sider>
    <my-mask
      v-if="!collapsed"
      @click="clickMask"
    />
    <Layout>
      <Header class="header-con">
        <header-bar
          :collapsed="collapsed"
          @on-coll-change="handleCollapsedChange"
        />
      </Header>
      <Content
        class="main-content-con"
        :style="{
          height: 100 * vh + 'px',
        }"
      >
        <Layout class="main-layout-con">
          <Blank />
          <Content class="content-wrapper">
            <router-view />
            <copyright v-if="isNeedCopyRight" />
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import Mask from '_c/mask'
import Blank from '_c/blank'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import Copyright from './components/copyright'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { routeEqual } from '@/libs/util'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop,
    Blank,
    Copyright,
    'my-mask': Mask
  },
  data () {
    return {
      collapsed: true,
      isFullscreen: false,
      vh: window.innerHeight * 0.01
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01
    })
  },
  computed: {
    isNeedCopyRight () {
      return !this.$config.noCopyRightComponentsRouterList.includes(this.routeName)
    },
    routeName () {
      return this.$route.name
    },
    hasGetInfo () {
      return this.$store.state.user.hasGetInfo
    },
    avatar () {
      return this.$store.state.user.avatar
    },
    username () {
      return this.$store.state.user.name
    },
    usergender () {
      return this.$store.state.user.gender
    },

    ...mapGetters(['errorCount']),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    cacheList () {
      const list = [
        'ParentView',
        ...(this.tagNavList.length
          ? this.tagNavList
            .filter(item => !(item.meta && item.meta.notCache))
            .map(item => item.name)
          : [])
      ]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions(['handleLogin', 'getUnreadMessageCount', 'handleLogout']),
    // 在mask上点击
    clickMask () {
      this.collapsed = true
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    navigateToLogin () {
      this.$router.push({
        name: 'login'
      })
    },
    async logout () {
      const res = await this.handleLogout()
      if (res) {
        this.$router.replace({
          name: 'login'
        })
      } else {
        this.$Message.error('退出失败')
      }
    },
    // 前往个人中心
    goToUserCenter () {
      this.closeSider()
      this.$router.push({
        name: 'userCenter'
      })
    },
    closeSider () {
      this.collapsed = true
    }
  }
}
</script>
