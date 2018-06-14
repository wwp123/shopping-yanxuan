import {recommendData, otherData, goodsDetailData, searchResultData} from '../server/getData'

export default {
  async getRecommendData ({
    commit,
    state
  }) {
    let res = await recommendData()
    commit('RECOMMEND_GOODS', res)
  },
  async getOtherData ({
    commit,
    state
  }) {
    let res = await otherData(state.otherDataName)
    commit('OTHER_GOODS', res)
  },
  async getGoodsDetailData ({
    commit,
    state
  }) {
    let res = await goodsDetailData(state.goodsId)
    commit('GOODS_DETAIL', res)
  },
  async getSearchResultData ({
    commit,
    state
  }) {
    let res = await searchResultData()
    commit('SEARCH_RESULT', res)
  },
  async UserLogin ({commit}, res) {
    commit('LOGIN', res)
  },
  async UserLogout ({
    commit,
    state
  }) {
    commit('LOGOUT')
  },
  async UserName ({commit}, res) {
    commit('USERNAME', res)
  }
}
