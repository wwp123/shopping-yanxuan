<template>
<ul class="goods">
  <li v-for="(item, index) in goods" :key="index">
    <router-link :to="{path:'/goodsDetail',query:{id:item.id}}" class="goods-item">
      <div class="img">
        <img :src="item.imgSrc" :alt="item.name">
        <span class="tag tag-hollow tag-h" v-if="item.tagColor">{{item.tagColor}}</span>
      </div>
      <div class="txt">
        <span v-for="(tag,index) in item.tags" :key="index" :class="['tag',tag.class]">{{tag.name}}</span>
        <p class="name">{{item.name}}</p>
        <p class="descript" v-if="item.descript">{{item.descript}}</p>
        <p class="price">{{item.price,item.yuan | priceFomat(item.price,item.yuan)}}</p>
        <span class="tag tag-hollow" v-if="item.tagNew">{{item.tagNew}}</span>
      </div>
    </router-link>
  </li>
  <li v-if="showAll">
    <a href="" class="show-all"><div class="text">查看全部</div></a>
  </li>
  <li v-if="showMore">
    <div class="show-more" @click="otherGoodsList(moreRouter)">
      <div class="text">
        <p>更多{{goods.title}}</p>
        <i class="iconfont icon-xiangyou2"></i>
      </div>
    </div>
  </li>
</ul>
</template>

<script>
export default {
  props: {
    goods: {},
    showAll: false,
    showMore: false,
    moreRouter: null
  },
  filters: {
    // 格式化价格
    priceFomat (price, yuan) {
      if (typeof yuan !== 'undefined') {
        return price + yuan
      } else {
        return '￥' + price
      }
    }
  },
  methods: {
    // 其他商品点击更多跳转到对应列表页
    otherGoodsList (route) {
      this.$router.push('/home/list?name=' + route)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .goods {
    background-color #fff
    font-size .6rem
    .goods-item {
      display block
      position relative
      color #333
      .img {
        height 5rem
        background-color #f4f4f4
        overflow hidden
      }
      .txt {
        position relative
        p {
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          margin-bottom .25rem
        }
      }
    }
  }
  .flex-item-2 {
    display flex
    flex-wrap wrap
    padding: 0 .3rem .1rem
    li {
      width 50%
      padding 0 .2rem
      margin-bottom .4rem
      box-sizing border-box
    }
  }
  .flex-swiper {
    display flex
    padding 0 .25rem
    li {
      flex 0 0 40%
      margin 0 .25rem .5rem
      overflow hidden
      &:last-child {
        padding-right .5rem
      }
      .txt {
        margin-top .5rem
      }
    }
    &.topic-goods {
      li {
        flex 0 0 12.3rem
        .img{
          width 100%
          height 6.9rem
          overflow hidden
          border-radius 4px
        }
        .name {
          padding-right 3.5rem
        }
        .price {
          position absolute
          right 0
          top 0
          margin-top 0
        }
      }
    }
  }
  .txt-absolute .txt {
    position absolute !important
    left .4rem
    top .4rem
  }
  .descript-absolute li {
    margin-bottom .5rem
    .txt  {
      padding-top 1.8rem
      .descript {
        position absolute
        top 0
        left 0
        width 100%
        height 1.5rem
        line-height 1.5rem
        padding 0 .25rem
        background-color #F1ECE2
        color #9F8A60
        box-sizing border-box
      }
    }
  }
</style>
