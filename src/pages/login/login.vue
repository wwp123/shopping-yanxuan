<template>
  <div>
    <topbar></topbar>
    <div v-show="!isShowPhoneLogin">
      <main>
        <div class="login-wrap">
          <div class="login-img"><i class="icon-login"></i></div>
          <div class="login-con">
            <div class="btn btn-full" @click="isShowPhoneLogin = true"><i class="iconfont icon-shouji"></i> 手机号码登录</div>
            <div class="btn btn-hollow btn-full"><i class="iconfont icon-youxiang"></i> 邮箱账号登录</div>
            <p><router-link to="/register">手机账号快速注册 <i class="iconfont icon-xiangyou"></i></router-link></p>
          </div>
        </div>
      </main>
      <footer class="flex quick-login">
        <div class="key"><i class="iconfont icon-weixin"></i> 微信</div>
        <div class="key"><i class="iconfont icon-qq"></i> QQ</div>
        <div class="key"><i class="iconfont icon-weibo"></i> 微博</div>
      </footer>
    </div>
    <!--手机号码登录-->
    <div class="login-wrap login-box" v-show="isShowPhoneLogin">
      <div class="login-img"><i class="icon-login"></i></div>
      <div class="login-con">
        <form>
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
          <div class="unlogin">
            <router-link to="/forget" class="fr">忘记密码</router-link>
            <router-link to="/register">注册账号</router-link>
          </div>
          <div class="btn btn-full" @click="submitForm(register)">登录</div>
          <div class="btn btn-hollow btn-full" @click="isShowPhoneLogin = false">其他登录方式</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import {mapState} from 'vuex'
import transferData from '@/tools/transferData.js'
import topbar from '@/components/topbar.vue'
import '@/assets/styles/login.styl'
export default {
  components: {
    topbar
  },
  data () {
    return {
      isShowPhoneLogin: false, // 手机号码登录显示
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
    ...mapState(['cartGoods']),
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
        transferData.userLogin(JSON.stringify(formName)).then(({data}) => {
          if (data.info === false) {
            Toast('账号不存在')
            return
          }
          if (data.success) {
            Toast('登录成功')
            let token = data.token
            let username = data.username
            this.$store.dispatch('UserLogin', token)
            this.$store.dispatch('UserName', username)
            this.$store.dispatch('mergeCart', this.cartGoods)
            // 跳到首页
            this.$router.push('/home')
          } else {
            Toast('密码错误')
          }
        })
      }
    }
  }
}
</script>
