const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/yanxuanMongo')

let db = mongoose.connection
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise

db.on('error', function () {
  console.log('数据库连接出错！')
})
db.on('open', function () {
  console.log('数据库连接成功！')
})

// 声明schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  create_time: Date
})
const cartSchema = mongoose.Schema({
  username: String,
  cartGoods: [
    {
      id: String,
      supId: String,
      name: String,
      pic: String,
      price: Number,
      sku: String,
      num: Number,
      checked: Boolean
    }
  ]
})
// 根据schema生成model
const User = mongoose.model('User', userSchema)
const Cart = mongoose.model('Cart', cartSchema)

module.exports = {
  User,
  Cart
}
