<template>
  <div>
    <header class="search-wrap border-b">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="换季收纳好物特惠" v-model="searchVal" @keyup="showClear($event)" @keyup.enter="search($event)">
        <i class="iconfont icon-guanbi" v-show="isShowClear" @click="clear()"></i>
      </div>
      <span class="search-btn btn-cancel" @click="goBack()">取消</span>
    </header>
    <div class="suggestion" v-show="isShowSuggestion">
      <ul>
        <router-link :to="{path:'/searchResult',query:{keyword:val}}" tag="li" v-for="(val,index) in this.$store.state.suggestionArr" :key="index" @click.native="search($event)">{{val}}</router-link>
      </ul>
    </div>
    <div class="history mb10" v-if="showHistory">
      <h4 class="hd">历史记录 <i class="iconfont icon-lajitong fr" @click="clearHistory()"></i></h4>
      <div class="bd">
        <router-link :to="{path:'/searchResult',query:{keyword:tag}}" v-for="(tag,index) in this.$store.state.tagsHistory" :key="index"><span class="tag tag-hollow">{{tag}}</span></router-link>
      </div>
    </div>
    <div class="history">
      <h4 class="hd">热门搜索</h4>
      <div class="bd">
        <router-link :to="{path:'/searchResult',query:{keyword:tag}}" v-for="(tag,index) in this.$store.state.tagsHot" :key="index" class="hot-tag"><span class="tag tag-hollow">{{tag}}</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowClear: false,
      searchVal: '',
      isShowSuggestion: false
    }
  },
  computed: {
    // 计算是否显示历史记录模块
    showHistory () {
      return !(this.$store.state.tagsHistory.length === 0)
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    // input显示清除按钮
    showClear (event) {
      if (event.key !== '') {
        this.isShowClear = true
        this.isShowSuggestion = true
      } else {
        this.isShowClear = false
        this.isShowSuggestion = false
      }
    },
    // 清除input内容
    clear () {
      this.searchVal = ''
      if (this.searchVal !== '') {
        this.isShowClear = true
        this.isShowSuggestion = true
      } else {
        this.isShowClear = false
        this.isShowSuggestion = false
      }
    },
    // 搜索：添加历史记录并跳转
    search (event) {
      this.isShowSuggestion = false
      if (event.key === 'Enter') {
        if (this.$store.state.tagsHistory.indexOf(this.searchVal.trim()) === -1) {
          this.$store.state.tagsHistory.unshift(this.searchVal.trim())
        }
      } else {
        if (this.$store.state.tagsHistory.indexOf(event.target.innerText) === -1) {
          this.$store.state.tagsHistory.unshift(event.target.innerText)
        }
        this.isShowSuggestion = false
      }
      this.$router.push({path: '/searchResult'})
    },
    // 清除历史记录
    clearHistory () {
      this.$store.state.tagsHistory = []
    }
  }
}
</script>

<style lang="stylus" scoped>
  .suggestion {
    width 100%
    height 19.5rem
    position absolute
    top 1.8rem
    left 0
    background-color #fff
    overflow auto
    ul {
      padding-left .5rem
      li {
        height 1.9rem
        line-height 1.9rem
        font-size .6rem
        &:not(:first-child) {
          border-top 1px solid #dfdfdf
        }
      }
    }
  }
  .history {
    background-color #ffffff
    padding-left .5rem
    font-size .6rem
    .hd {
      color #999
      height 1.9rem
      line-height 1.9rem
      padding-right .5rem
      .iconfont {
        font-size .7rem
        padding 0 .25rem
      }
    }
  }
  .tag-hollow {
    border-color #999999
    color #333333
    padding 4px 6px
    border-radius 2px
    margin 0 .65rem .65rem 0
  }
  .hot-tag:nth-child(-n+4) .tag-hollow {
    border-color #b4282d
    color #b4282d
  }
</style>
