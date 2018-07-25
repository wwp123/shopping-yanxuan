<template>
  <div>
    <topbar></topbar>
    <main v-show="isShowMain">
      <swiper :slides="goods.imgSrc"></swiper>
      <ul class="characteristic">
        <li v-for="(item, index) in goods.characteristicList" :key="index">
          <div class="img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="txt">
            <P v-for="(txt, index) in item.simpleDescList" :key="index">{{txt}}</P>
          </div>
        </li>
      </ul>
      <section class="goods-info flex">
        <div class="info">
          <h2>{{goods.name}}</h2>
          <p class="descript">{{goods.descript}}</p>
          <p class="price">￥{{goods.price}}</p>
          <span v-if="goods.itemTagList" v-for="(tag, index) in goods.itemTagList" :key="index" class="tag tag-hollow">
            {{tag}}<i class="iconfont icon-xiangyou"></i>
          </span>
        </div>
        <div class="key">
          <p class="num">{{commentNum}}</p>
          <p>用户评价</p>
          <span class="btn btn-small btn-7f7f7f" @click="toggleComment()">查看</span>
        </div>
      </section>
      <ul class="flex-list mt10">
        <li @click="toggleSpec()">
          <div class="info">{{activeSkuDes}}</div>
          <div class="key"><i class="iconfont icon-xiangyou"></i></div>
        </li>
        <li>
          <div class="info">积分：购买最高得{{pointNum}}积分</div>
        </li>
        <li @click="toggleService()">
          <div class="key">服务：</div>
          <div class="info">
            <ul class="service-info dot-list">
              <li v-for="(policy, index) in goods.policyList" :key="index">{{policy.title}}</li>
            </ul>
          </div>
          <div class="key"><i class="iconfont icon-xiangyou"></i></div>
        </li>
      </ul>
      <ul class="flex-list mt10">
        <li @click="toggleComment()">
          <div class="info">用户评价({{commentNum}})</div>
          <div class="key">查看全部 <i class="iconfont icon-xiangyou"></i></div>
        </li>
        <li v-for="(item, index) in goods.comments" :key="index" v-if="index === 0">
          <div class="info comment-user">
            <div class="user-info">
              <img :src="item.frontUserAvatar" class="portrait" alt="用户头像">
              <span class="name">{{item.frontUserName}}</span>
              <span class="star"><i class="iconfont icon-xing" v-for="n in item.star" :key="n"></i></span>
            </div>
            <div class="extra-info">
              {{item.commentTime}}
              <span v-for="(sku, index) in item.skuInfo" :key="index">{{sku}}；</span>
            </div>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
      <section class="mt10 bgc-fff">
        <ul class="flex-list attr-list">
          <li>
            <div class="info">商品参数</div>
          </li>
          <li v-for="(item, index) in goods.attrList" :key="index">
            <div class="key">{{item.attrName}}</div>
            <div class="info">{{item.attrValue}}</div>
          </li>
        </ul>
        <section v-html="goods.detailHtml"></section>
        <section class="mod" v-if="goods.reportCheck">
          <div class="mod-hd">
            <span class="mod-tit">质检报告</span>
          </div>
          <div class="mod-bd">
            <img :src="goods.reportCheck" class="reportcheck" alt="质检报告">
          </div>
        </section>
        <section class="mod">
          <div class="mod-hd">
            <span class="mod-tit">常见问题</span>
          </div>
          <div class="mod-bd">
            <ul class="dot-list question-list">
              <li v-for="(item, index) in goods.issueList" :key="index">
                <p class="question" v-html="item.question"></p>
                <p v-html="item.answer"></p>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </main>
    <!--规格面板-->
    <transition name="slide" mode="out-in">
      <section class="panel" v-show="isShowSpec">
        <div class="panel-bd spec-box">
          <div class="spec-hd">
            <img :src="activeSkuPic === '' ? goods.skuImg : activeSkuPic" alt="">
            <div class="txt">
              <p class="price">价格：￥{{activeSkuPrice === '' ? goods.price : activeSkuPrice}}</p>
              <p>已选择：<span>{{activeSkuSelect}}</span></p>
            </div>
          </div>
          <ul class="spec-list">
            <li v-for="(item, itemIndex) in skuMap" :key="itemIndex">
              <h4>{{item.name}}</h4>
              <div><span v-for="(tag, index) in item.list" :key="index" @click="tagVal($event,itemIndex)" :class="[activeSkuVal[itemIndex] === tag ? 'active' : '','tag tag-hollow']">{{tag}}</span></div>
            </li>
            <li>
              <h4>数量</h4>
              <div class="count">
                <span @click="countGoodsNumber(false)">-</span>
                <input type="number" value="1" v-model="goodsNumber" />
                <span @click="countGoodsNumber(true)">+</span>
              </div>
            </li>
          </ul>
        </div>
        <footer class="footer">
          <div class="flex">
            <div class="key" @click="toggleSpec()">返回</div>
            <div class="info"><div class="btn btn-white btn-full">立即购买</div></div>
            <div class="info"><div class="btn btn-full" @click="addCart('sku')">加入购物车</div></div>
          </div>
        </footer>
      </section>
    </transition>
    <!--评论面板-->
    <transition name="slide" mode="out-in">
      <section class="panel  comment-list" v-show="isShowComment">
        <div class="panel-hd"><span class="tag tag-hollow">全部({{commentNum}})</span></div>
        <div class="panel-bd">
          <ul>
            <li v-for="(item, index) in goods.comments" :key="index">
              <div class="info comment-user">
                <div class="user-info">
                  <img :src="item.frontUserAvatar" class="portrait" alt="用户头像">
                  <span class="name">{{item.frontUserName}}</span>
                  <span class="star"><i class="iconfont icon-xing" v-for="n in item.star" :key="n"></i></span>
                </div>
                <div class="extra-info">
                  {{item.commentTime}}
                  <span v-for="(sku, index) in item.skuInfo" :key="index">{{sku}}；</span>
                </div>
                <p>{{item.content}}</p>
              </div>
            </li>
          </ul>
          <div class="flex panel-ft">
            <div class="info" @click="toggleComment()">返回</div>
          </div>
        </div>
      </section>
    </transition>
    <!--服务面板-->
    <transition name="slide" mode="out-in">
      <section class="panel " v-show="isShowService">
        <div class="panel-hd">服务</div>
        <div class="panel-bd">
          <ul class="dot-list question-list">
            <li v-for="(policy, index) in goods.policyList" :key="index">
              <p class="question">{{policy.title}}</p>
              <p v-if="policy.content">{{policy.content}}</p>
              <p v-if="policy.distributionArea">不支持省份：<span v-for="(area, index) in policy.distributionArea.provinceList" :key="index">{{area}}</span></p>
            </li>
          </ul>
        </div>
        <div class="flex panel-ft">
          <div class="info" @click="toggleService()">返回</div>
        </div>
      </section>
    </transition>
    <aside>
      <gotop></gotop>
    </aside>
    <footer class="footer">
      <div class="flex">
        <div class="key"><i class="iconfont icon-kefu"></i></div>
        <div class="info"><div class="btn btn-white btn-full" @click="toggleSpec()">立即购买</div></div>
        <div class="info"><div class="btn btn-full" @click="addCart()">加入购物车</div></div>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import swiper from '@/components/swiper.vue'
import gotop from '@/components/gotop.vue'
import topbar from '@/components/topbar.vue'
import { Toast } from 'mint-ui'

export default {
  components: {
    swiper,
    gotop,
    topbar
  },
  data  () {
    return {
      goods: {}, // 商品
      comments: [], // 评价
      isShowSpec: false, // 是否显示规格面板
      isShowComment: false, // 是否显示评价面板
      isShowService: false, // 是否显示服务面板
      goodsNumber: 1, // 商品数量
      skuMap: {}, // 商品规格
      activeSkuVal: {}, // 选中规格
      activeSkuId: null, // 选中规格对应id
      activeSkuPrice: '', // 选中规格对应价格
      activeSkuPic: '', // 选中规格对应图片
      isAllSelected: false // 是否全部选中
    }
  },
  computed: {
    ...mapState({
      goodsDetailData: state => state.goodsDetailData,
      cartGoods: state => state.cartGoods,
      token: state => state.token
    }),
    ...mapGetters(['cartGoodsNumber']),
    // 积分
    pointNum () {
      return Math.floor(this.goods.price / 10)
    },
    // 评价
    commentNum () {
      return this.comments.length
    },
    // 是否显示主面板
    isShowMain () {
      return !(this.isShowSpec || this.isShowComment || this.isShowService)
    },
    // 主面板请选择规格数量
    activeSkuDes () {
      return this.isAllSelected ? '已选择：' + Object.values(this.activeSkuVal).join(' ') + 'X' + this.goodsNumber : '请选择规格数量'
    },
    // 规格面板请选择规格数量
    activeSkuSelect () {
      return Object.values(this.activeSkuVal).length === 0 ? '请选择规格数量' : Object.values(this.activeSkuVal).join(' ')
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$store.state.goodsId = this.$route.query.id
      this.$store.dispatch('getGoodsDetailData')
    },
    // 显示隐藏规格面板
    toggleSpec () {
      this.isShowSpec = !this.isShowSpec
    },
    // 显示隐藏评价面板
    toggleComment () {
      this.isShowComment = !this.isShowComment
    },
    // 显示隐藏服务面板
    toggleService () {
      this.isShowService = !this.isShowService
    },
    // 商品数量加减
    countGoodsNumber (flag) {
      if (flag) {
        this.goodsNumber++
      } else {
        if (this.goodsNumber <= 1) {
          Toast('本商品1件起售')
          this.goodsNumber = 1
          return
        }
        this.goodsNumber--
      }
    },
    // 规格选中
    tagVal (event, index) {
      this.activeSkuVal[index] = event.target.innerText
      this.activeSkuVal = Object.assign({}, this.activeSkuVal)
      this.goods.skuList.forEach((value, index) => {
        let flag = false
        if (Object.values(this.activeSkuVal).length === value.itemSkuSpecValueList.length) {
          this.isAllSelected = true
          flag = true
          value.itemSkuSpecValueList.forEach((val, i) => {
            if (Object.values(this.activeSkuVal)[i] !== val.value) {
              flag = false
            }
          })
        }
        if (flag) {
          this.activeSkuPrice = value.calcPrice
          this.activeSkuPic = value.pic
          this.activeSkuId = value.id
        }
      })
    },
    // 加入购物车
    addCart (panel) {
      if (this.isAllSelected) {
        Toast('加入成功')
        // if (!this.cartGoods[this.$route.query.id]) {
        // let item = {[this.$route.query.id]: {
        //   'name': this.goods.name,
        //   'pic': this.activeSkuPic,
        //   'price': this.activeSkuPrice,
        //   'sku': Object.values(this.activeSkuVal).join('; '),
        //   'num': this.goodsNumber,
        //   'checked': true
        // }}
        // this.cartGoods[this.$route.query.id] = item
        // } else {
        //   this.cartGoods[this.$route.query.id].num += this.goodsNumber
        // }
        if (!this.cartGoods[this.activeSkuId]) {
          let item = {[this.activeSkuId]: {
            'supId': this.$route.query.id,
            'name': this.goods.name,
            'pic': this.activeSkuPic,
            'price': this.activeSkuPrice,
            'sku': Object.values(this.activeSkuVal).join('; '),
            'num': this.goodsNumber,
            'checked': true
          }}
          this.cartGoods[this.activeSkuId] = item[this.activeSkuId]
        } else {
          this.cartGoods[this.activeSkuId].num += this.goodsNumber
        }
        this.$store.dispatch('updateCart', this.cartGoods)
      } else {
        if (panel === 'sku') {
          for (let key in this.skuMap) {
            if (Object.keys(this.activeSkuVal).indexOf(key) === -1) {
              Toast('请选择' + this.skuMap[key].name)
              return
            }
          }
        } else {
          this.toggleSpec()
        }
      }
    }
  },
  watch: {
    goodsDetailData: function (value) {
      if (value) {
        this.goods = value
        this.comments = value.comments
        value.skuList.forEach((val, index) => {
          val.itemSkuSpecValueList.forEach((item, index) => {
            if (!this.skuMap[item.id]) {
              this.skuMap[item.id] = {}
              this.skuMap[item.id]['name'] = item.name
              this.skuMap[item.id]['list'] = []
            }
            if (this.skuMap[item.id]['list'].indexOf(item.value) === -1) {
              this.skuMap[item.id]['list'].push(item.value)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer {
    height 2.2rem
    & > div {
      position fixed
      bottom 0
      left 0
      width 100%
      height 2.2rem
      line-height 2.2rem
      background-color #ffffff
      border-top 1px solid #c7c7c7
      overflow hidden
      z-index 90
      .key {
        flex-basis 3.3rem
        border-right 1px solid #c7c7c7
        .iconfont {
          font-size 1.2rem
          color #999
        }
      }
    }
  }
  .characteristic {
    display flex
    justify-content space-evenly
    background-color #F9F9F9
    padding .5rem
    li {
      flex-grow 1
      display flex
      justify-content center
      align-items center
      .img {
        flex-basis 1.5rem
        margin-right .25rem
        img {
          width 100%
          height 100%
          border-radius 50%
        }
      }
      .txt {
        font-size .6rem
        line-height 1
        p:first-child {
          margin-bottom .25rem
        }
      }
    }
  }
  .goods-info {
    background-color #ffffff
    padding .75rem 0 .75rem .5rem
    .info {
      text-align left
      h2 {
        font-size .75rem
      }
      .descript {
        font-size .6rem
        color #7f7f7f
        margin-top .25rem
      }
      .price {
        font-size 1rem
        font-weight 700
        color #B4282D
        margin-top .25rem
      }
      .tag-hollow {
        color #f48f18
        border 1px solid #f48f18
        margin .5rem .25rem 0 0
        .iconfont {
          font-size .6rem
        }
      }
    }
    .key {
      border-left 1px dashed #919191
      font-size .6rem
      color #B4282D
      padding .5rem
      .num {
        font-weight 700
      }
      p {
        margin-bottom .25rem
      }
    }
  }
  .dot-list {
    font-size .6rem
    & > li {
      padding-left .5rem
      position relative
      &:after {
        content ''
        display inline-block
        width 4px
        height 4px
        background-color #b4282d
        position absolute
        left .1rem
        top .2rem
      }
    }
  }
  .service-info {
    display flex
    flex-wrap wrap
    font-size .6rem
    color #7f7f7f
    padding-top .2rem
    & > li {
      line-height 1
      margin 0 .75rem .5rem 0
      padding-left .5rem
    }
  }
  .attr-list {
    padding .5rem .5rem 0
    & > li {
      border-style dashed
      border-color #999
      .key {
        flex-basis 3.5rem
        color #999
      }
    }
  }
  .comment-user {
    font-size .6rem
    .user-info {
      padding-top .5rem
      display flex
      align-items center
      margin-bottom .5rem
      .portrait {
        width 1.4rem
        height 1.4rem
        border-radius 50%
        margin-right .25rem
      }
      .name {
        margin-right .25rem
      }
      .star .iconfont {
        font-size .6rem
        color #ffb54a
        margin-right .15rem
      }
    }
    .extra-info {
      color #7f7f7f
      line-height 1
      margin-bottom .25rem
    }
    p {
      line-height .8rem
    }
  }
  .reportcheck {
    border 1px solid rgba(0,0,0,.15)
  }
  .question-list {
    color #787878
    line-height .75rem
    & > li {
      margin-bottom .5rem
      .question {
        color #303030
        margin-bottom .25rem
      }
    }
  }
  .panel {
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-color #fff
    padding 1.8rem 0 2.2rem 0
    z-index 99
    .panel-bd {
      padding .5rem
      .question-list > li {
        margin-bottom 1rem
        p {
          line-height 1.5
        }
      }
    }
  }
  .comment-list {
    .panel-hd   {
      text-align left
      padding .25rem .5rem
      .tag-hollow {
        color #b4282d
        border-color #b4282d
        padding .2rem .25rem
      }
    }
    .panel-bd {
      padding-top 0
      padding-bottom 0
      li {
        border-bottom 1px solid #ececec
        padding-bottom .5rem
      }
    }
  }
  .spec-box {
    font-size .6rem
    .spec-hd {
      display flex
      align-items flex-end
      img {
        width 4.2rem
        height 4.2rem
        background-color #f4f4f4
      }
      .txt {
        margin-left .5rem
        line-height 1.6
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      }
    }
    .spec-list {
      margin-top 1rem
      & > li {
        padding-bottom .5rem
        h4 {
          padding-bottom .5rem
        }
        .tag-hollow {
          border-color #333
          color #333
          padding .35rem .7rem
          margin 0 .5rem .5rem 0
          &.active {
            border-color #b4282d
            color #b4282d
          }
        }
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition all .4s
  }
  .slide-enter, .slide-leave-active {
    transform translate3d(2rem, 0, 0)
    opacity 0
  }
</style>
