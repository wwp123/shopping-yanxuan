
![预览图][1]


  [1]: src/assets/images/preview.jpg "预览图.jpg"
  手机请扫二维码进行预览
  
<a href="https://wwp123.github.io/shopping-yanxuan/dist/#/home" target="_blank">PC端可直接戳我进行预览哦~</a>

==注意== 因为无法搭建服务端，所以此预览无法进行注册和登录，建议下载食用更美味哦~

## 技术栈

vue2 + vue-cli + vuex + vue-router + webpack + ES6 + axios + stylus + mint-ui + koa + mongodb

## 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## 注意点
* 问题：启动服务，用本机IP无法访问此网站
* 解决方法： 在bulid目录下有一个webpack.dev.config.js的配置文件，发现devServer对象里的host属性取自HOST || config.dev.host。查看config.dev.host（按ctrl并点击config.dev.host）自动跳转到config目录下的index.js, 找到dev对象的host属性，默认是localhost，把它改为0.0.0.0，并重启服务即可

* 问题： webpack设置跨域
* 解决方法： 在config目录下的index.js设置
proxyTable: {
      '/api': {
        target: 'http://localhost:8888', //目标接口域名
        changeOrigin: true //是否跨域
      }
    }

## 说明

1. 本项目基于vue-cli搭建，利用token方式进行用户登录验证，并实现注册入库、读取用户等功能
2. 本地购物车数据使用localstorage进行存储，登录后与原有的购物车数据进行合并 
3. 本项目使用mongodb作为后台数据库
