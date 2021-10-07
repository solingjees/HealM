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
      <md-field class="input-item">
        <label class="input-item-title">请输入您的密码</label>
        <md-input
          v-model="$v.form.password.$model"
          type="password"
          class="input-item-input"
        />
      </md-field>
      <div
        v-if="$v.form.password.$dirty"
        class="error-group"
      >
        <span
          v-if="!$v.form.password.required"
          class="md-error"
        >密码必填</span>
        <span
          v-else-if="!$v.form.password.minLength"
          class="md-error"
        >密码至少六位</span>
        <span
          v-else-if="!$v.form.password.alphaNum"
          class="md-error"
        >密码由大小写字母和数字组成</span>
      </div>
      <div class="option-line">
        <router-link
          :to="{ name: 'phoneLogin' }"
          tag="div"
        >
          手机号登录
        </router-link>
        <router-link
          :to="{name:'forgetPassword'}"
          tag="div"
        >
          忘记密码？
        </router-link>
      </div>

      <md-button
        class="md-raised md-primary submit-button"
        type="submit"
      >
        立即登录
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
  numeric,
  alphaNum
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      phoneNumber: '',
      password: ''
    }
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
      password: {
        required,
        minLength: minLength(6),
        alphaNum
      }
    }
  },
  methods: {
    ...mapActions(['handleLogin', 'handleGetInfo']),
    async submit () {
      if (!this.$v.$invalid) {
        // pass the input valid check
        const res = await this.handleLogin(this.form)
        if (res.status) {
          // 登录成功后，获取用户的信息

          const res2 = await this.handleGetInfo(true)
          if (res2.status) {
            if (this.identity === 0) {
              // common user
              this.$router.push({
                name: 'myHealth'
              })
            } else {
              // doctor
              this.$router.push({
                name: 'patient'
              })
            }
            this.$Message.success('用户登录成功')
          } else {
            // 用户信息获取失败
            this.$Message.error('用户信息获取失败')
          }
        } else {
          this.form.password = ''
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
