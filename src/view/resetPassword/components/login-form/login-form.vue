<template>
  <div class="login-form-wrapper">
    <form
      novalidate
      class="login-form"
      @submit.prevent="submit"
    >
      <md-field class="input-item">
        <label class="input-item-title">请输入您的新密码</label>
        <md-input
          v-model="$v.form.newPassword.$model"
          type="password"
          class="input-item-input"
        />
      </md-field>
      <div
        v-if="$v.form.newPassword.$dirty"
        class="error-group"
      >
        <span
          v-if="!$v.form.newPassword.required"
          class="md-error"
        >密码必填</span>
        <span
          v-else-if="!$v.form.newPassword.minLength"
          class="md-error"
        >密码至少六位</span>
        <span
          v-else-if="!$v.form.newPassword.alphaNum"
          class="md-error"
        >密码由大小写字母和数字组成</span>
      </div>
      <md-field class="input-item">
        <label class="input-item-title">请再次输入密码</label>
        <md-input
          v-model="$v.form.repeatPassword.$model"
          class="input-item-input"
          type="password"
        />
      </md-field>
      <div
        v-if="$v.form.repeatPassword.$dirty"
        class="error-group"
      >
        <span
          v-if="!$v.form.repeatPassword.required"
          class="md-error"
        >请再次输入密码</span>
        <span
          v-else-if="!$v.form.repeatPassword.sameAsPassword"
          class="md-error"
        >两次密码不一致</span>
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
import { required, minLength, alphaNum, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { sendPhoneVerify, checkPhoneVerify } from '_api/login'
import { setToken } from '_utils/util'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      newPassword: '',
      repeatPassword: ''
    }
  }),
  validations: {
    form: {
      newPassword: {
        required,
        minLength: minLength(6),
        alphaNum
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('newPassword')
      }
    }
  },
  methods: {
    ...mapActions(['handleGetInfo', 'handleResetPassword']),
    /**
     * 手机号登录
     */
    async submit () {
      if (!this.$v.$invalid) {
        // pass the input valid check
        const res = await this.handleResetPassword({
          newPassword: this.form.newPassword
        })
        if (res.status) {
          // reset password success! reset token, login again
          setToken('')
          this.$Message.success(res.script)
          this.$router.replace({ name: 'login' })
        } else {
          this.$Message.error(res.script)
        }
      }
    }
  }
}
</script>
<style lang="less">
@import './login-form.less';
</style>
