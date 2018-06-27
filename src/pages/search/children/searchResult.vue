<template>
  <div>
    <header>
      <div class="isFixed">
        <div class="search-wrap border-b">
          <router-link to="/home" class="search-btn"><i class="iconfont icon-shouye mr10"></i></router-link>
          <router-link to="/search" class="search">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="换季收纳好物特惠" :value="this.$route.query.keyword">
          </router-link>
        </div>
        <ul class="sort">
          <li :class="{curr:sortBy == 'multi'}" @click="chooseSort('multi',false)">
            <div class="tit">综合</div>
          </li>
          <li :class="{curr:sortBy == 'price'}" @click="chooseSort('price',true)">
            <div class="tit">价格<span class="sort-icon"><i :class="[{curr: priceSortKeyCurr === 0},'iconfont icon-xiangshang']"></i><i :class="[{curr: priceSortKeyCurr === 1},'iconfont icon-xiangxia']"></i></span></div>
            <div class="con" v-show="isShowSortCon && sortBy == 'price'" @click.stop="showSortCon()">
              <ul class="flex-list">
                <li>
                  <div class="key">筛选</div>
                  <div class="info">
                    <input type="number" placeholder="最低价" v-model="minPrice">
                    <span class="line">——</span>
                    <input type="number" placeholder="最高价" v-model="maxPrice">
                  </div>
                </li>
                <li>
                  <div class="key">排序</div>
                  <div class="info">
                    <span v-for="(value,key,index) in priceSortKey" :key="index" :class="[{curr: index === priceSortKeyCurr},'tag tag-hollow']" @click="priceSortKeySelect(value,index)">{{value.txt}}</span>
                  </div>
                </li>
              </ul>
              <div class="btn-group">
                <div class="btn" @click.stop="unShowSortCon()">取消</div>
                <div class="btn btn-confirm" @click.stop="sortPriceConfirm()">确定</div>
              </div>
            </div>
          </li>
          <li :class="{curr:sortBy == 'classify'}" @click="chooseSort('classify',true)">
            <div class="tit">分类</div>
            <div class="con classify-con" v-show="isShowSortCon && sortBy == 'classify'">
              <span v-for="(value,index) in classifyTag" :key="index" :class="{curr: index===classifyTagCurr}" @click="classifyTagSelect(value,index)">{{value}}</span>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <section class="pt10 bgc-fff">
      <Goods :goods='goods' :class="'flex-item-2 descript-absolute'"></Goods>
    </section>
    <section class="nodata" v-if="goodsLen">
      <i class="icon icon-search"></i>
      <p>抱歉，没有找到符合条件的商品</p>
      <p>建议修改筛选条件重新查找</p>
    </section>
    <div class="mask" v-show="isShowSortCon" @click="unShowSortCon()"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Goods from '@/components/goods.vue'

export default {
  components: {
    Goods
  },
  data () {
    return {
      goods: [], // 商品
      sortBy: 'multi', // 筛选的条件
      isShowSortCon: false, // 是否显示筛选内容
      priceSortKey: {
        // 价格排序
        asc: {
          order: 1,
          txt: '从低到高'
        },
        desc: {
          order: -1,
          txt: '从高到低'
        }
      },
      order: 0, // 排序方式
      priceSortKeyCurr: null, // 价格排序标签选中
      minPrice: null, // 用户输入的最低价格
      maxPrice: null, // 用户输入的最高价格
      classifyTag: ['全部'], // 分类标签
      classifyTagCurr: 0 // 分类标签默认选中
    }
  },
  computed: {
    ...mapState({ searchResultData: state => state.searchResultData }),
    // 计算商品数量
    goodsLen () {
      if (this.goods.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.$store.dispatch('getSearchResultData')
  },
  methods: {
    // 重新给goods赋值
    deassignGoods () {
      this.goods = []
      for (let i in this.searchResultData) {
        this.goods.push(this.searchResultData[i])
      }
    },
    // 综合、价格、分类选中
    chooseSort (type, flag) {
      if (this.sortBy === type) {
        if (flag) {
          this.isShowSortCon = !this.isShowSortCon
        }
      } else {
        this.sortBy = type
        if (flag) {
          this.isShowSortCon = true
        } else {
          this.isShowSortCon = false
        }
      }
      if (type === 'multi') {
        // 综合排序
        this.priceSortKeyCurr = null
        this.order = 0
        this.deassignGoods()
      }
    },
    // 调整最低价最高价
    sortPriceFomat () {
      let tempPrice = 0
      if (
        this.minPrice !== null &&
        this.maxPrice !== null &&
        parseInt(this.minPrice) > parseInt(this.maxPrice)
      ) {
        tempPrice = this.minPrice
        this.minPrice = this.maxPrice
        this.maxPrice = tempPrice
      }
    },
    // 商品按照价格排序
    priceFilter () {
      this.deassignGoods()
      // 价格区间筛选
      this.goods = [
        ...this.goods.filter((value, index) => {
          if (this.minPrice !== null && this.minPrice !== '') {
            if (parseFloat(value.price) < parseFloat(this.minPrice)) return false
          }
          if (this.maxPrice !== null && this.maxPrice !== '') {
            if (parseFloat(value.price) > parseFloat(this.maxPrice)) return false
          }
          return true
        })
      ]
    },
    // 排序方式选中
    priceSortKeySelect (value, index) {
      if (this.priceSortKeyCurr === index) {
        this.priceSortKeyCurr = null
        this.order = 0
      } else {
        this.priceSortKeyCurr = index
        this.order = value.order
      }
    },
    // 排序方式
    priceSort () {
      this.goods.sort((a, b) => {
        a = a['price']
        b = b['price']
        return (a === b ? 0 : a > b ? 1 : -1) * this.order
      })
    },
    // 分类标签选中
    classifyTagSelect (value, index) {
      this.classifyTagCurr = index
      this.deassignGoods()
      if (index > 0) {
        this.goods = [
          ...this.goods.filter((val, i) => {
            return val.modTitle === value
          })
        ]
      }
    },
    // 确定按钮
    sortPriceConfirm () {
      this.isShowSortCon = false
      this.sortPriceFomat()
      this.priceFilter()
      this.priceSort()
    },
    // 显示筛选内容
    showSortCon () {
      this.isShowSortCon = true
    },
    // 不显示筛选内容
    unShowSortCon () {
      this.isShowSortCon = false
    }
  },
  watch: {
    searchResultData: function (value) {
      if (value) {
        for (let i in value) {
          this.goods.push(value[i])
          if (this.classifyTag.indexOf(value[i].modTitle) === -1) {
            this.classifyTag.push(value[i].modTitle)
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
header {
  height 3.4rem
}
.sort {
  display flex
  justify-content center
  height 1.6rem
  font-size 0.6rem
  border-bottom 1px solid #d9d9d9
  position relative
  z-index 101
  & > li {
    flex-grow 1
    align-self center
    text-align center
    &.curr .tit {
      color #b4282d
    }
    .con {
      position absolute
      left 0
      top calc(1.6rem + 1px)
      width 100%
      background-color #ffffff
      box-shadow 0 2px 3px rgba(0, 0, 0, 0.1)
      text-align left
      box-sizing border-box
      .flex-list {
        padding 0.5rem 0 0.5rem 0.5rem
        & > li {
          border none
          .key {
            flex-basis 2rem
          }
          input {
            width 5.4rem
            height 1.1rem
            line-height 1.1rem
            border 1px solid #7f7f7f
            text-align center
            &:focus {
              border-color #b4282d
            }
          }
          .line {
            color #7f7f7f
          }
        }
      }
    }
  }
}
.btn-group {
  display flex
  border-top 1px solid #d9d9d9
  height 2.2rem
  line-height 2.2rem
  .btn {
    flex-grow 1
    font-size 0.6rem
    background-color #fff
    color #333
    border none
    &.btn-confirm {
      color #b4282d
    }
    &:not(:first-child) {
      border-left 1px solid #d9d9d9
    }
  }
}
.sort-icon {
  position relative
  margin-left 0.25rem
  .iconfont {
    position absolute
    font-size 0.4rem
    color #999
    &.curr {
      color #b4282d
    }
  }
  .icon-xiangshang {
    top 1px
  }
  .icon-xiangxia {
    bottom 0
  }
}
.tag-hollow {
  border-color #999999
  color #333333
  padding 4px 12px
  border-radius 2px
  margin-right 0.5rem
  margin-bottom 0
  &.curr {
    border-color #b4282d
    color #b4282d
  }
}
.classify-con {
  padding 0.5rem 2rem
  span {
    display inline-block
    white-space nowrap
    margin 0.5rem 1.5rem 0.5rem 0
    &.curr {
      color #b4282d
    }
  }
}
.mask {
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 99
}
</style>
