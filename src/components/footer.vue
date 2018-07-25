<template>
  <footer class="footer-nav">
    <ul>
      <router-link to="/home" tag="li">
        <i class="iconfont icon-shouye"></i>
        <p>首页</p>
      </router-link>
      <!-- <router-link to="/shop" tag="li">
        <i class="iconfont icon-shiwu"></i>
        <p>识物</p>
      </router-link> -->
      <router-link to="/classify" tag="li">
        <i class="iconfont icon-fenlei"></i>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <i class="iconfont icon-gouwuche"></i>
        <p>购物车</p>
        <span class="icon-num" v-if="this.$store.getters.cartGoodsNumber !== 0">{{this.$store.getters.cartGoodsNumber}}</span>
      </router-link>
      <router-link to="/center" tag="li">
        <i class="iconfont icon-geren"></i>
        <p>个人</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .footer-nav {
    height 2rem
    ul {
      position fixed
      left 0
      bottom 0
      width 100%
      height 2rem
      background-color #fafafa
      border-top 1px solid #d9d9d9
      display flex
      justify-content center
      li {
        flex-grow 1
        align-self center
        text-align center
        font-size .6rem
        color #666666
        position relative
        &.router-link-active {
            color #b4282d
        }
        p {
          margin-top .15rem
        }
      }
    }
  }
</style>
