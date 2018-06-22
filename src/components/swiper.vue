<template>
  <div class="swiper-container" id="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in slides" :key="index">
        <img :src="slide">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
export default {
  props: {
    slides: {}
  },
  data () {
    return {
      mySwiper: null
    }
  },
  updated () {
    this.initData()
  },
  methods: {
    initData () {
      this.mySwiper = new Swiper('#swiper', {
        loop: true,
        pagination: '.swiper-pagination',
        autoplay: 2000,
        paginationClickable: true
      })
    }
  }
}
</script>

<style lang="stylus">
.swiper-container > .swiper-pagination-bullets .swiper-pagination-bullet {
  width 0.8rem
  height 0.08rem
  margin 0 0.1rem
  background-color #ffffff
  opacity 0.4

  &.swiper-pagination-bullet-active {
    opacity 1
  }
}

</style>
