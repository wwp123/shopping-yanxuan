import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import home from '@/pages/home/home.vue'
import shop from '@/pages/shop/shop.vue'
import classify from '@/pages/classify/classify.vue'
import classifyDetail from '@/pages/classify/children/classifyDetail.vue'
import cart from '@/pages/cart/cart.vue'
import center from '@/pages/center/center.vue'
import search from '@/pages/search/search.vue'
import searchResult from '@/pages/search/children/searchResult.vue'
import recommend from '@/pages/home/children/recommend.vue'
import other from '@/pages/home/children/other.vue'
import goodsDetail from '@/pages/goodsDetail/goodsDetail.vue'
import login from '@/pages/login/login.vue'
import register from '@/pages/login/children/register.vue'
import forget from '@/pages/login/children/forget.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      // 首页
      path: '/home',
      component: home,
      children: [
        {
          // 推荐
          path: '',
          component: recommend
        },
        {
          // 其他商品
          path: 'list',
          component: other
        }
      ]
    },
    {
      // 识物
      path: '/shop',
      component: shop
    },
    {
      // 分类
      path: '/classify',
      component: classify
    },
    {
      // 分类详情
      path: '/classifyDetail',
      component: classifyDetail
    },
    {
      // 购物车
      path: '/cart',
      component: cart
    },
    {
      // 个人中心
      path: '/center',
      component: center,
      meta: {
        requireAuth: true
      }
    },
    {
      // 搜索页
      path: '/search',
      component: search
    },
    {
      // 搜索结果页
      path: '/searchResult',
      component: searchResult
    },
    {
      // 商品详情页
      path: '/goodsDetail',
      component: goodsDetail
    },
    {
      // 登录
      path: '/login',
      component: login
    },
    {
      // 注册
      path: '/register',
      component: register
    },
    {
      // 忘记密码
      path: '/forget',
      component: forget
    }
  ]
})
router.push('/home')

router.beforeEach((to, from, next) => {
  // 对路由进行验证
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      // 登录
      next()
    } else {
      // 未登录
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router
