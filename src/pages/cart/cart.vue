<template>
  <div>
    <div class="panel">
      <div class="panel-hd h36">
        <div class="isFixed">
          <h1>购物车</h1>
          <div class="panel-btn" v-if="cartGoodsNumber !== 0" @click="editorGoods($event)">编辑</div>
        </div>
      </div>
      <div class="panel-bd">
        <div class="notice" v-if="totalPrice >= 88"><span>已满足免邮条件</span></div>
        <ul class="service-policy" v-else>
          <li v-for="service in servicePolicy" :key="service"><i class="iconfont icon-quan"></i>{{service}}</li>
        </ul>
        <section v-if="cartGoodsNumber !== 0">
          <ul class="flex-list goods-list">
            <li v-for="(goods, index) in this.cartGoods" :key="index">
              <div class="key"><span class="checkbox" :checked="isShowEditor?editCheckedGoods[index]:goods.checked" @click="toggleChecked(goods,index)"><i class="iconfont icon-check"></i></span></div>
              <div class="info nowrap">
                <router-link :to="{path:'/goodsDetail',query:{id:goods.supId}}"><img :src="goods.pic" alt=""></router-link>
                <div class="txt">
                  <h4>{{goods.name}}</h4>
                  <p class="des">{{goods.sku}}</p>
                  <div class="txtbtm">
                    <div class="count fr">
                      <span @click="countGoodsNumber(goods,false)" :class="{disabled: goods.num === 1}">-</span>
                      <input type="number" v-model="goods.num" />
                      <span @click="countGoodsNumber(goods,true)">+</span>
                    </div>
                    <span>{{goods.price | priceFomat(goods.price)}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <div class="nodata" v-else>
          <i class="icon icon-cart"></i>
          <p>去添加点什么吧</p>
          <div v-if="typeof token !== 'string'"><router-link to="/login" class="btn">登录</router-link></div>
        </div>
      </div>
      <div class="panel-ft" v-if="cartGoodsNumber !== 0">
        <div class="info">
          <span class="checkbox" :checked="isSelectedAll" @click="selectedAll(isSelectedAll)"><i class="iconfont icon-check"></i></span>
          <span>已选({{selectedNum}})</span>
          <span class="fr price" v-if="!isShowEditor">{{totalPrice | priceFomat(totalPrice)}}</span>
        </div>
        <div class="key" v-if="!isShowEditor">
          <span :class="[{'disabled': selectedNum <= 0},'btn btn-full']">下单</span>
        </div>
        <div class="key" v-else>
          <span :class="[{'disabled': selectedNum <= 0},'btn btn-full']" @click="deleteGoods()">删除所选</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Footer from '@/components/footer.vue'
import { Toast } from 'mint-ui'

export default {
  components: {
    Footer
  },
  data () {
    return {
      servicePolicy: ['30天无忧退货', '48小时快速退款', '满88元免邮费'],
      totalPrice: 0, // 商品总价格
      isSelectedAll: true, // 是否全选
      selectedNum: this.$store.getters.cartGoodsNumber, // 选中个数
      isShowEditor: false, // 是否显示编辑面板
      editCheckedGoods: {} // 编辑状态选中的商品
    }
  },
  // 过滤
  filters: {
    // 格式化价格
    priceFomat (price) {
      return '￥' + price.toFixed(2)
    }
  },
  created () {
    this.getAllGoodsPrice()
  },
  computed: {
    ...mapState(['cartGoods', 'token', 'username']),
    ...mapGetters(['cartGoodsNumber'])
  },
  methods: {
    // 商品数量加减
    countGoodsNumber (goods, flag) {
      if (flag) {
        goods.num++
      } else {
        if (goods.num <= 1) {
          Toast('本商品1件起售')
          goods.num = 1
          return
        }
        goods.num--
      }
      this.$store.dispatch('updateCart', this.cartGoods)
      this.getSelectedNumber()
      this.getAllGoodsPrice()
    },
    // 单个商品是否选中
    toggleChecked (goods, index) {
      if (!this.isShowEditor) {
        if (typeof goods.checked === 'undefined') {
          this.$set(goods, 'checked', true)
        } else {
          goods.checked = !goods.checked
        }
      } else {
        this.editCheckedGoods[index] = !this.editCheckedGoods[index]
        this.editCheckedGoods = {...this.editCheckedGoods}
      }
      this.hasSelectedAll()
      this.getSelectedNumber()
      this.getAllGoodsPrice()
    },
    // 计算已选中个数
    getSelectedNumber () {
      let selectedNum = 0
      if (!this.isShowEditor) {
        Object.values(this.cartGoods).forEach((value, index) => {
          if (value.checked) {
            selectedNum += value.num
          }
        })
      } else {
        Object.values(this.editCheckedGoods).forEach((value, index) => {
          if (value) {
            selectedNum += 1
          }
        })
      }
      this.selectedNum = selectedNum
    },
    // 计算所有商品价格
    getAllGoodsPrice () {
      let totalPrice = 0
      Object.values(this.cartGoods).forEach((value, index) => {
        if (value.checked) {
          totalPrice += value.price * value.num
        }
      })
      this.totalPrice = totalPrice
    },
    // 全选
    selectedAll (flag) {
      this.isSelectedAll = !flag
      if (!this.isShowEditor) {
        Object.values(this.cartGoods).forEach((value, index) => {
          if (typeof value.checked === 'undefined') {
            this.$set(value, 'checked', !flag)
          } else {
            value.checked = !flag
          }
        })
      } else {
        for (let i in this.editCheckedGoods) {
          this.editCheckedGoods[i] = !flag
        }
      }
      this.getSelectedNumber()
      this.getAllGoodsPrice()
    },
    // 判断是否全选
    hasSelectedAll () {
      let flag = true
      if (!this.isShowEditor) {
        Object.values(this.cartGoods).forEach((value, index) => {
          if (!value.checked) {
            flag = false
          }
        })
      } else {
        if (Object.values(this.editCheckedGoods).length === Object.values(this.cartGoods).length) {
          Object.values(this.editCheckedGoods).forEach((value, index) => {
            flag = flag && value
          })
        } else {
          flag = false
        }
      }
      this.isSelectedAll = flag
    },
    // 编辑商品
    editorGoods ($event) {
      this.isShowEditor = !this.isShowEditor
      if (this.isShowEditor) {
        event.target.innerText = '完成'
        for (let i in this.cartGoods) {
          this.editCheckedGoods[i] = false
        }
      } else {
        event.target.innerText = '编辑'
      }
      this.hasSelectedAll()
      this.getSelectedNumber()
    },
    // 删除商品
    deleteGoods () {
      for (let i in this.editCheckedGoods) {
        if (this.editCheckedGoods[i]) {
          delete this.editCheckedGoods[i]
          delete this.cartGoods[i]
        }
      }
      this.editCheckedGoods = {...this.editCheckedGoods}
      this.$store.dispatch('updateCart', this.cartGoods)
      this.hasSelectedAll()
      this.getSelectedNumber()
      this.getAllGoodsPrice()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .h36 {
    height 1.8rem
  }
  .panel {
    .panel-hd {
      background-color #fff
      .panel-btn {
        position absolute
        right .5rem
        top 0
      }
    }
    .panel-bd {
      padding-bottom 2rem
    }
    .panel-ft {
      bottom 2rem
      height 2rem
      line-height 2rem
      background-color #fff
      font-size .6rem
      .info {
        flex-grow 1
        padding 0 .5rem
        font-size 0
        span {
          font-size .6rem
        }
      }
      .btn {
        width 4.8rem
        &.disabled {
          background-color #ccc
          border-color #ccc
          pointer-events none
        }
      }
    }
  }
  .checkbox {
    display inline-block
    width .7rem
    height .7rem
    border 1px solid #d9d9d9
    background-color #fff
    border-radius 50%
    text-align center
    line-height .7rem
    margin-right .5rem
    .iconfont {
      font-size .6rem
      color #fff
    }
    &[checked] {
      background-color #b4282d
      border-color #b4282d
    }
  }
  .service-policy {
    background-color transparent
    color #666
    .iconfont {
      color #666
    }
  }
  .notice {
    display flex
    align-items center
    font-size .65rem
    color #f48f18
    background-color #fff8d8
    padding 0 .5rem
    height 1.7rem
    span {
      flex-grow 1
    }
  }
  .goods-list {
    & > li {
      padding 0
      border none
      &:not(:first-child) .info {
        border-top 1px solid #ececec
      }
      .key {
       padding .5rem 0
       align-self center
      }
      .info {
        padding .5rem .5rem .5rem 0
        img {
          width 3.4rem
          height 3.4rem
          background-color #f4f4f4
          margin-right .5rem
          float left
        }
        .txt {
          line-height 1
          .des {
            color #666666
            margin-top .25rem
          }
          .txtbtm {
            margin-top 1rem
            line-height 1rem
          }
        }
      }
    }
  }
  .count {
    height 1rem
    line-height 1rem
    input {
      line-height 1rem
      width 2rem
    }
    span {
      width 1.5rem
      font-size 1rem
    }
  }
</style>
