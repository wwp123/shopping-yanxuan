<template>
  <div>
    <swiper :slides="banners"></swiper>
    <ul class="service-policy">
      <li v-for="service in servicePolicy" :key="service"><i class="iconfont icon-dagou"></i>{{service}}</li>
    </ul>
    <section class="mt10">
      <a class="title has-icon" href="">{{provideGoods.title}} <i class="iconfont icon-xiangyou1"></i></a>
      <Goods :goods='provideGoods.items' :class="'flex-item-2 txt-absolute'"></Goods>
    </section>
    <section class="mt10 bgc-fff">
      <a href="" class="cus-title title-new">
        <h2>{{newGoods.title}}</h2>
        <span class="tag-showall">查看全部 <i class="iconfont icon-xiangyou"></i></span>
      </a>
      <div class="over-auto">
        <Goods :goods="newGoods.items" :class="'flex-swiper'" :showAll="true"></Goods>
      </div>
    </section>
    <section class="mt10 bgc-fff">
      <a href="" class="cus-title title-hot">
        <h2>{{hotGoods.title}}</h2>
        <span class="tag-showall">查看全部 <i class="iconfont icon-xiangyou"></i></span>
      </a>
      <div class="over-auto">
        <Goods :goods="hotGoods.items" :class="'flex-swiper'" :showAll="true"></Goods>
      </div>
    </section>
    <section class="mt10 bgc-fff">
      <a class="title has-icon" href="">{{topicGoods.title}} <i class="iconfont icon-xiangyou1"></i></a>
      <div class="over-auto">
        <Goods :goods='topicGoods.items' :class="'flex-swiper topic-goods'"></Goods>
      </div>
    </section>
    <section class="mt10" v-for="(item, index) in otherGoods" :key="index">
      <h2 class="title">{{item.title}}好物</h2>
      <Goods :goods='item.items' :class="'flex-item-2 descript-absolute'" :showMore="true" :moreRouter="item.modTitle"></Goods>
    </section>
    <aside>
      <span class="gift"></span>
      <gotop></gotop>
    </aside>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import Goods from '@/components/goods.vue'
import swiper from '@/components/swiper.vue'
import gotop from '@/components/gotop.vue'
export default {
  components: {
    swiper,
    Goods,
    gotop
  },
  data () {
    return {
      banners: [],
      servicePolicy: ['网易自营品牌', '30天无忧退货', '48小时快速退款'],
      provideGoods: {},
      newGoods: {},
      hotGoods: {},
      topicGoods: {},
      otherGoods: {}
    }
  },
  computed: {
    ...mapState({recommendData: state => state.recommendData})
  },
  created () {
    this.$store.dispatch('getRecommendData')
  },
  watch: {
    recommendData: function (value) {
      if (value) {
        this.provideGoods = value.modCon.provideGoods
        this.newGoods = value.modCon.newGoods
        this.hotGoods = value.modCon.hotGoods
        this.topicGoods = value.modCon.topicGoods
        this.otherGoods = value.modCon.otherGoods
        this.banners = value.banner
      }
    }
  }
}
</script>
