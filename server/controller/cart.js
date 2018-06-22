const DBOperator = require('../db.js')
const Cart = DBOperator.Cart
// 数据库的操作
// 查找
const dbFind = (field, param) => {
  return new Promise((resolve, reject) => {
    Cart.findOne({ [field]: param }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 获取购物车数据
const CARTGOODSKEY = ['supId', 'name', 'num', 'pic', 'price', 'sku', 'checked']
const getCart = async (ctx) => {
  let ctxBody = ctx.request.body
  let doc = await dbFind('username', ctxBody.username)
  let cartGoods = {}
  if (doc) {
    doc.cartGoods.forEach((value, index) => {
      let good = {}
      CARTGOODSKEY.forEach((val) => {
        good[val] = value[val]
      })
      cartGoods[value.id] = good
    })
  }
  ctx.body = cartGoods
}
// 合并购物车
const mergeCart = async (ctx) => {
  let ctxBody = ctx.request.body
  let doc = await dbFind('username', ctxBody.username)
  await new Promise((resolve, reject) => {
    for (let key in ctxBody.cartGoods) {
      let flag = false
      doc.cartGoods.forEach((value, index) => {
        if (value.id === key) {
          value.num += ctxBody.cartGoods[key].num
          flag = true
        }
      })
      if (!flag) {
        let goodData = {...ctxBody.cartGoods[key]}
        goodData['id'] = key
        doc.cartGoods.push(goodData)
      }
    }
    let query = {username: ctxBody.username}
    let newValue = {$set: doc}
    Cart.update(query, newValue, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
  await getCart(ctx)
}
// 加入购物车
const updateCart = async (ctx) => {
  let ctxBody = ctx.request.body
  let doc = await dbFind('username', ctxBody.username)
  await new Promise((resolve, reject) => {
    if (doc) { // 有此用户,更新
      doc.cartGoods = []
      for (let key in ctxBody.cartGoods) {
        let goodData = {...ctxBody.cartGoods[key]}
        goodData['id'] = key
        doc.cartGoods.push(goodData)
      }
      let query = {username: ctxBody.username}
      let newValue = {$set: doc}
      Cart.update(query, newValue, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    } else { // 无此用户，插入
      let goodList = []
      for (let id in ctxBody.cartGoods) {
        let goodData = {...ctxBody.cartGoods[id]}
        goodData['id'] = id
        goodList.push(goodData)
      }
      let cart = new Cart({
        username: ctxBody.username,
        cartGoods: goodList
      })
      cart.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    }
  })

  ctx.body = {
    success: true
  }
}

module.exports = {
  getCart,
  mergeCart,
  updateCart,
  dbFind
}
