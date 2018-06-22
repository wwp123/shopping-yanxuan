import axios from 'axios'

// 首页推荐
export const recommendData = () => axios.get('static/json/recommendGoods.json').then((res) => {
  return res.data.recommend
})

// 首页其他商品等
export const otherData = (name) => axios.get('static/json/otherGoods.json').then((res) => {
  return res.data[name]
})

// 首页所有其他商品等
export const allOtherData = () => axios.get('static/json/otherGoods.json').then((res) => {
  return res.data
})

// 搜索结果
export const searchResultData = () => axios.get('static/json/searchResult.json').then((res) => {
  return res.data
})

// 商品详情
export const goodsDetailData = (id) => axios.get('static/json/goodsDetail.json').then((res) => {
  return res.data[id]
})
