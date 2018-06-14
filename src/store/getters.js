export default {
  // 购物车商品数量
  cartGoodsNumber: state => {
    let sum = 0
    Object.values(state.cartGoods).forEach((value, index) => {
      sum += value.num
    })
    if (sum > 99) {
      return '99+'
    } else {
      return sum
    }
  }
}
