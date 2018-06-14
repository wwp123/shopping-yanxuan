<template>
  <header class="topbar">
    <div class="flex isFixed">
      <router-link to="/home" class="key"><i class="iconfont icon-shouye"></i></router-link>
      <router-link to="/home" class="info"><h1 class="logo"></h1></router-link>
      <router-link to="/search" class="key"><i class="iconfont icon-sousuo"></i></router-link>
      <router-link to="/cart" class="key">
        <i class="iconfont icon-gouwuche"></i>
        <span class="icon-num" v-if="cartGoodsNumber !== 0">{{cartGoodsNumber}}</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['cartGoodsNumber'])
  }
}
</script>
