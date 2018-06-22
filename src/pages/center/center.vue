<template>
  <div>
    <header class="flex center-head">
      <div class="key">
        <img src="//yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="用户头像">
      </div>
      <div class="info">
        <p class="username">{{this.$store.state.username}}</p>
        <p>普通用户</p>
      </div>
    </header>
    <main>
      <ul class="flex-block-3">
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>我的订单</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>周六一起拼</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>售后服务</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>优惠券</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>我的红包</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>优先购</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>礼品卡</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>积分中心</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>会员俱乐部</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>地址管理</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>帐号安全</p>
        </li>
        <li>
          <i class="iconfont icon-shiwu"></i>
          <p>联系客服</p>
        </li>
        <li class="no-bottom">
          <i class="iconfont icon-shiwu"></i>
          <p>帮助中心</p>
        </li>
        <li class="no-bottom">
          <i class="iconfont icon-shiwu"></i>
          <p>意见反馈</p>
        </li>
      </ul>
      <div class="mt10 mb10">
        <div class="btn btn-full btn-white" @click="logout()">退出登录</div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Footer from '@/components/footer.vue'

export default {
  components: {
    Footer
  },
  methods: {
    logout () {
      MessageBox.confirm('退出登录?').then(action => {
        this.$store.dispatch('UserLogout')
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .center-head {
    height 5.8rem
    background-image url(../../assets/images/center-bg.png)
    background-size 100%
    background-position bottom center
    padding-left .75rem
    overflow hidden
    color #fff
    img {
      width 3rem
      height 3rem
      border-radius 50%
    }
    .info {
      text-align left
      margin-left .75rem
      .username {
        font-size .75rem
        margin-bottom .25rem
      }
    }
  }
  .btn {
    height 2rem
    line-height 2rem
  }
</style>
