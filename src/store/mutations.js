const RECOMMEND_GOODS = 'RECOMMEND_GOODS'
const OTHER_GOODS = 'OTHER_GOODS'
const ALL_OTHER_GOODS = 'ALL_OTHER_GOODS'
const GOODS_DETAIL = 'GOODS_DETAIL'
const SEARCH_RESULT = 'SEARCH_RESULT'
const MERGE_CART = 'MERGE_CART'
const UPDATE_CART = 'UPDATE_CART'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USERNAME = 'USERNAME'

export default {
  [RECOMMEND_GOODS] (state, res) {
    state.recommendData = {...res}
  },
  [OTHER_GOODS] (state, res) {
    state.otherData = {...res}
  },
  [ALL_OTHER_GOODS] (state, res) {
    state.allOtherData = {...res}
  },
  [GOODS_DETAIL] (state, res) {
    state.goodsDetailData = {...res}
  },
  [SEARCH_RESULT] (state, res) {
    state.searchResultData = {...res}
  },
  [MERGE_CART] (state, res) {
    state.cartGoods = {...res}
  },
  [UPDATE_CART] (state, res) {
    state.cartGoods = {...res}
  },
  [LOGIN] (state, res) {
    state.token = res
    window.sessionStorage.setItem('token', res)
  },
  [LOGOUT] (state) {
    state.token = null
    window.sessionStorage.removeItem('token')
  },
  [USERNAME] (state, res) {
    state.username = res
    window.sessionStorage.setItem('username', res)
  }
}
