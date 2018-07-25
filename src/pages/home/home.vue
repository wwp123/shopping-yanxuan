<template>
  <div>
    <header id="head">
      <div :class="isFixed == true ? 'isFixed' :''">
        <div class="search-wrap">
          <span class="logo"></span>
          <router-link to="/search" class="search">
            <i class="iconfont icon-sousuo"></i>
            <span>搜索商品, 共9747款好物</span>
          </router-link>
        </div>
        <div class="tab">
          <ul>
            <router-link to="/home" tag="li">推荐</router-link>
            <router-link :to="{path:'/home/list',query:{name:index}}" v-for="(tit, index) in tabs" :key="index" tag="li">{{tit}}</router-link>
          </ul>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'

export default {
  components: {
    Footer
  },
  data () {
    return {
      isFixed: false,
      tabs: {
        // "recommend":"推荐",
        live: '居家',
        part: '配件',
        clothing: '服装',
        appliance: '电器',
        wash: '洗护',
        diet: '饮食'
      }
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
      const offsetTop = document.querySelector('#head').offsetTop
      if (scrollTop >= offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#head {
  height 3.1rem
}
</style>
