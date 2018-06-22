const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser') // bodyparser:该中间件用于post请求的数据
const UserController = require('./server/controller/user.js') // 引入数据库操作方法
const checkToken = require('./server/token/checkToken.js') // checkToken作为中间件存在
const cartController = require('./server/controller/cart.js') // 引入数据库操作方法

app.use(bodyParser())

// 登录
const loginRouter = new Router()
loginRouter.post('/login', UserController.Login)

// 注册
const registerRouter = new Router()
registerRouter.post('/register', UserController.Reg)

// 获取所有用户
const userRouter = new Router()
userRouter.get('/user', checkToken, UserController.GetAllUsers)

// 加入购物车
const cartRouter = new Router()
cartRouter.post('/cart/:op', async (ctx)=>{
  if(ctx.params.op === 'get') {
    await cartController.getCart(ctx)
  } else if(ctx.params.op === 'merge') {
    await cartController.mergeCart(ctx)
  } else {
    await cartController.updateCart(ctx)
  }
  ctx.status = 200
})

// 装载子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/api', registerRouter.routes(), registerRouter.allowedMethods())
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
router.use('/api', cartRouter.routes(), cartRouter.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('The server is running at http:// localhost:' + 8888)
})
