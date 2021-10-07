<template>
  <div class="login-form-wrapper">
    <form
      novalidate
      class="login-form"
      @submit.prevent="submit"
    >
      <md-field class="input-item">
        <label class="input-item-title">请输入您的手机号</label>
        <md-input
          v-model="$v.form.phoneNumber.$model"
          class="input-item-input"
        />
      </md-field>
      <div
        v-if="$v.form.phoneNumber.$dirty"
        class="error-group"
      >
        <span
          v-if="!$v.form.phoneNumber.required"
          class="md-error"
        >手机号必填</span>
        <span
          v-else-if="!$v.form.phoneNumber.numeric"
          class="md-error"
        >手机号只接受数字</span>
        <span
          v-else-if="
            !$v.form.phoneNumber.minLength || !$v.form.phoneNumber.maxLength
          "
          class="md-error"
        >手机号为11位</span>
      </div>
      <md-field
        v-if="!$v.form.phoneNumber.$invalid"
        class="input-item"
      >
        <label class="input-item-title">请输入手机验证码</label>
        <md-input
          v-model="$v.form.verifyCode.$model"
          class="input-item-input"
        />
        <span class="md-suffix">
          <div
            class="captcha"
            :class="{ clicked: hasSendCaptcha }"
            @click="getCaptcha"
          >
            {{ hasSendCaptcha ? remainedTime + '秒后重发' : '发送验证码' }}
          </div>
        </span>
      </md-field>
      <div
        v-if="$v.form.verifyCode.$dirty"
        class="error-group"
      >
        <span
          v-if="!$v.form.verifyCode.required"
          class="md-error"
        >验证码必填</span>
        <span
          v-else-if="
            !$v.form.verifyCode.minLength || !$v.form.verifyCode.maxLength
          "
          class="md-error"
        >验证码为四位</span>
      </div>
      <md-button
        class="md-raised md-primary submit-button"
        type="submit"
      >
        确认
      </md-button>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  numeric
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { sendPhoneVerify, checkPhoneVerify } from '_api/login'
import { setToken } from '_utils/util'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      phoneNumber: '',
      verifyCode: ''
    },
    hasSendCaptcha: false,
    remainedTime: 60,
    clock: () => {}
  }),
  computed: {
    identity () {
      return this.$store.state.user.identity
    }
  },
  validations: {
    form: {
      phoneNumber: {
        required,
        numeric,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      verifyCode: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(4)
      }
    }
  },
  watch: {
    remainedTime (newval, oldval) {
      if (newval <= 0) {
        window.clearInterval(this.clock)
        this.clock = () => {}
        this.remainedTime = 60
        this.hasSendCaptcha = false
      }
    }
  },
  methods: {
    ...mapActions(['handleGetInfo']),
    /**
     * 手机号登录
     */
    async submit () {
      if (!this.$v.$invalid) {
        // pass the input valid check
        const res = await checkPhoneVerify(this.form)
        if (res.status) {
          // 登录成功后，获取用户的信息
          setToken(res.data.token)
          const res2 = await this.handleGetInfo()
          if (res2.status) {
            this.$Message.success('用户认证成功')

            // route to the reset-password page
            this.$router.replace({
              name: 'resetPassword'
            })
          } else {
            // 用户信息获取失败
            this.$Message.error('用户信息获取失败')
          }
        } else {
          this.$Message.error(res.script)
        }
      }
    },
    /**
     * 获取验证码
     */
    async getCaptcha () {
      // if phoneNumber is invalid, block up it.
      if (this.$v.form.phoneNumber.$invalid) return
      if (this.hasSendCaptcha) return
      // send captcha success
      this.hasSendCaptcha = true
      var that = this
      this.clock = setInterval(() => {
        that.remainedTime -= 1
      }, 1000)

      const errorHandler = res => {
        // send captcha failed
        this.$Message.error({
          content: res.script
        })
      }
      try {
        const res = await sendPhoneVerify({
          phoneNumber: this.form.phoneNumber
        })
        if (res.status) {
        } else {
          errorHandler(res)
        }
      } catch (err) {
        errorHandler(res)
      }
    }
  }
}
</script>
<style lang="less">
@import './login-form.less';
</style>
