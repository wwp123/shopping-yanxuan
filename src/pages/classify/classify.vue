<template>
  <div>
    <header>
      <div class="isFixed">
        <div class="search-wrap border-b">
          <router-link to="/search" class="search">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="搜索商品, 共10340款好物" :value="this.$route.query.keyword">
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <div class="classify">
        <ul class="left">
          <li v-for="(title, index) in modTitle" :key="index" :class="{active: index === isActive}" @click="changeActive(index)">{{title}}</li>
        </ul>
        <ul class="right">
          <li>
            <div class="img" :style="{ backgroundImage: 'url(' + banner +')' }">
            </div>
            <div class="mod">
              <div class="mod-hd"><span class="mod-tit">{{modTitle[isActive]}}分类</span></div>
              <div class="mod-bd">
                <ul class="flex-block-3">
                  <router-link :to="{path:'/classifyDetail',query:{list:title[isActive]}}" v-for="(good, index) in goods" :key="index" tag="li">
                    <img :src="good.pic" alt="">
                    <p>{{good.title}}</p>
                  </router-link>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Footer from '@/components/footer.vue'

export default {
  components: {
    Footer
  },
  data () {
    return {
      title: [],
      modTitle: [],
      banner: '',
      goods: {},
      isActive: 0 // 当前选中
    }
  },
  computed: {
    ...mapState(['allOtherData', 'otherData'])
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$store.dispatch('getAllOtherData')
    },
    changeActive (index) { // 选中
      this.isActive = index
      this.getOtherData(index)
    },
    getOtherData (index) {
      this.$store.state.otherDataName = this.title[index]
      this.$store.dispatch('getOtherData')
    }
  },
  watch: {
    allOtherData: function (value) {
      if (value) {
        this.title = Object.keys(value)
        Object.values(value).forEach((val, index) => {
          this.modTitle.push(val.modTitle)
        })
        this.getOtherData(0)
      }
    },
    otherData: function (value) {
      if (value) {
        this.goods = value.modCon
        this.banner = value.banner
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  header {
    height 1.8rem
  }
  .search-wrap .search input {
    flex-grow 0
  }
  .classify {
    background-color #ffffff
    height calc(100vh - 3.8rem)
    font-size .6rem
    line-height 1rem
    text-align center
    overflow hidden
    .left {
      width 3.5rem
      height 100%
      border-right 1px solid #dfdfdf
      float left
      padding .5rem 0
      overflow auto
      li {
        margin-bottom .75rem
        position relative
        &.active {
          color #b4282d
          font-size .75rem
          &:before {
            content ''
            position absolute
            top 0
            bottom 0
            left 0
            width 3px
            background-color #b4282d
          }
        }
      }
    }
    .right {
      margin-left calc(3.5rem + 1px)
      padding .6rem
      overflow auto
      .img {
        width 100%
        height 4rem
        border-radius 5px
        background center no-repeat #f4f4f4
        background-size cover
      }
      .mod-bd {
        padding 0
        .flex-block-3 li {
          border none
          margin-bottom .75rem
          img {
            width 3rem
            height 3rem
            margin 0 auto
          }
          p {
            margin 0
            line-height 1
          }
        }
      }
    }
  }
</style>
