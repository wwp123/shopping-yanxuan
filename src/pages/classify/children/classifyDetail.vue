<template>
  <div>
    <header class="h72">
      <div class="isFixed">
        <topbar></topbar>
        <div class="tab">
          <ul>
            <li v-for="(good, index) in goods" :key="index" :class="{active: isActive === index}" @click="changeActive (index)">{{good.title}}</li>
          </ul>
        </div>
      </div>
    </header>
    <section class="mt10" v-for="(good, index) in goods" :key="index" v-if="isActive === index">
      <p class="title">{{good.littleTitle}}</p>
      <Goods :goods='good.items' :class="'flex-item-2 descript-absolute'"></Goods>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import topbar from '@/components/topbar.vue'
import Goods from '@/components/goods.vue'
export default {
  components: {
    topbar,
    Goods
  },
  data () {
    return {
      title: [],
      goods: {},
      isActive: 0 // 当前选中
    }
  },
  computed: {
    ...mapState(['otherData'])
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$store.dispatch('getOtherData')
    },
    changeActive (index) { // 选中
      this.isActive = index
    }
  },
  watch: {
    otherData: function (value) {
      if (value) {
        this.goods = value.modCon
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .h72 {
    height 3.6rem
  }
  .tab {
    height 1.6rem
    line-height calc(1.6rem - 1px)
    border-bottom 1px solid #ececec
  }
</style>
