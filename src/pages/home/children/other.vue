<template>
  <div>
    <a href=""><img :src="banner" alt=""></a>
    <section class="mt10" v-for="(item, index) in goods" :key="index">
      <a class="title" href="">{{item.title}}<p>{{item.littleTitle}}</p></a>
      <Goods :goods='item.items' :class="'flex-item-2 descript-absolute'"></Goods>
    </section>
    <gotop></gotop>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Goods from '@/components/goods.vue'
import gotop from '@/components/gotop.vue'

export default {
  components: {
    Goods,
    gotop
  },
  data () {
    return {
      banner: '',
      goods: {}
    }
  },
  computed: {
    ...mapState({ otherData: state => state.otherData })
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$store.state.otherDataName = this.$route.query.name
      this.$store.dispatch('getOtherData')
    }
  },
  watch: {
    otherData: function (value) {
      if (value) {
        this.goods = value.modCon
        this.banner = value.banner
      }
    },
    $route () {
      this.initData()
    }
  }
}
</script>
