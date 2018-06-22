<template>
  <span class="gotop" id="gotop" v-show="isShow" @click="goTop()"><i class="iconfont icon-xiangshang"></i></span>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      timer: null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 800) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    goTop () {
      let _this = this
      cancelAnimationFrame(_this.timer)
      _this.timer = requestAnimationFrame(function fn () {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          scrollTo(0, oTop - 50)
          _this.timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(_this.timer)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.gotop {
  display inline-block
  width 1.7rem
  height 1.7rem
  border-radius 50%
  background-color #fff
  border 1px solid #ededed
  text-align center
  line-height 1.7rem
  position fixed
  right 0.5rem
  bottom 2.5rem
  color #ccc
}
</style>
