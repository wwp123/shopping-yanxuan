<template>
  <div>
    <topbar></topbar>
    <main class="login-wrap login-box">
      <h2 class="login-title">手机号注册</h2>
      <div class="login-con">
        <form ref="registerForm">
          <ul class="flex-list">
            <li>
              <div class="info">
                <input type="number" maxlength="11" placeholder="请输入手机号码" v-model="register.user" @keyup="showClear($event)" @blur="validateNumber()">
              </div>
              <div class="key" @click="clear()"><i class="iconfont icon-guanbi" v-show="isShowClear"></i></div>
            </li>
            <li>
              <div class="info">
                <input :type="inputType" placeholder="请输入密码" v-model="register.password" @blur="validatePsd()">
              </div>
              <div class="key" @click="isShowPassword = !isShowPassword"><i :class="['iconfont',{'icon-bukejian': isShowPassword,'icon-kejian': !isShowPassword}]"></i></div>
            </li>
          </ul>
          <p class="error" v-show="isShowError">{{errorTxt}}</p>
          <div class="btn btn-full" @click="submitForm(register)">注册</div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import transferData from '@/tools/transferData.js'
import topbar from '@/components/topbar.vue'
import '@/assets/styles/login.styl'
export default {
  components: {
    topbar
  },
  data () {
    return {
      isShowClear: false, // 是否显示清除按钮
      isShowPassword: false, // 密码是否可见
      errorTxt: '', // 错误提示信息
      isShowError: false, // 是否显示错误提示信息
      register: {
        // 注册信息
        user: '', // 账号
        password: '' // 密码
      }
    }
  },
  computed: {
    // 密码输入框类型
    inputType () {
      if (this.isShowPassword) {
        return 'text'
      } else {
        return 'password'
      }
    }
  },
  methods: {
    // input显示清除按钮
    showClear (event) {
      if (event.key !== '') {
        this.isShowClear = true
      } else {
        this.isShowClear = false
      }
    },
    // 清除input内容
    clear () {
      this.register.user = ''
      if (this.register.user !== '') {
        this.isShowClear = true
      } else {
        this.isShowClear = false
      }
    },
    // 验证号码
    validateNumber () {
      if (this.register.user === '') {
        this.isShowError = true
        this.errorTxt = '请输入手机号码'
        return false
      } else {
        let flag = /^((13|15|18|14|17)+\d{9})$/.test(this.register.user)
        if (!flag) {
          this.isShowError = true
          this.errorTxt = '手机号码格式不正确'
          return false
        } else {
          this.isShowError = false
          return true
        }
      }
    },
    // 验证密码
    validatePsd () {
      if (this.register.password === '') {
        this.isShowError = true
        this.errorTxt = '请输入密码'
        return false
      } else {
        let flag = /^\w{6,18}$/.test(this.register.password)
        if (!flag) {
          this.isShowError = true
          this.errorTxt = '密码不能少于6位'
          return false
        } else {
          this.isShowError = false
          return true
        }
      }
    },
    // 提交表单
    submitForm (formName) {
      if (this.validateNumber() && this.validatePsd()) {
        transferData.userRegister(JSON.stringify(formName)).then(({data}) => {
          if (data.success) {
            Toast('注册成功')
            this.$router.push('/login')
          } else {
            Toast('用户名已经存在')
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn {
  margin-top 1rem
}
</style>
