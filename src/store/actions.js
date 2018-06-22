import {
  recommendData,
  otherData,
  allOtherData,
  goodsDetailData,
  searchResultData
} from '../tools/getData'
import transferData from '../tools/transferData'

export default {
  async getRecommendData ({ commit, state }) {
    let res = await recommendData()
    commit('RECOMMEND_GOODS', res)
  },

  async getOtherData ({ commit, state }) {
    let res = await otherData(state.otherDataName)
    commit('OTHER_GOODS', res)
  },

  async getAllOtherData ({ commit, state }) {
    let res = await allOtherData()
    commit('ALL_OTHER_GOODS', res)
  },

  async getGoodsDetailData ({ commit, state }) {
    let res = await goodsDetailData(state.goodsId)
    commit('GOODS_DETAIL', res)
  },

  async getSearchResultData ({ commit, state }) {
    let res = await searchResultData()
    commit('SEARCH_RESULT', res)
  },

  async updateCart ({ commit, state }, res) {
    let tempCartGoods = {}
    for (let id in res) {
      tempCartGoods[id] = {...res[id]}
    }
    if (state.token) {
      let updateCartData = {
        username: state.username,
        token: state.token,
        cartGoods: tempCartGoods
      }
      transferData
        .updateShoppingCart(JSON.stringify(updateCartData))
        .then(({ data }) => {
        })
    } else {
      localStorage.setItem('tempCartGoods', JSON.stringify(tempCartGoods))
    }
    commit('UPDATE_CART', res)
  },

  async mergeCart ({ commit, state }, res) {
    let tempCartGoods = {}
    for (let id in res) {
      tempCartGoods[id] = {...res[id]}
    }
    let updateCartData = {
      username: state.username,
      token: state.token,
      cartGoods: tempCartGoods
    }
    transferData
      .mergeShoppingCart(updateCartData)
      .then(({ data }) => {
        commit('UPDATE_CART', data)
      })
    commit('MERGE_CART', res)
  },

  async UserLogin ({ commit }, res) {
    commit('LOGIN', res)
  },

  async UserLogout ({ commit, state }) {
    localStorage.removeItem('tempCartGoods')
    state.cartGoods = {}
    commit('LOGOUT')
  },

  async UserName ({ commit }, res) {
    commit('USERNAME', res)
  }
}
