const express = require('express')
const app = express()

// 导入并配置cors中间件，解决跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析application / x - www - form - urlencoded格式表单数据
app.use(express.urlencoded({ extended: false }))

// 注册一个中间键，给res添加cc函数，用来响应
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 配置解析token的中间件
const config = require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

const joi = require('joi')
    // 定义错误级别的中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

// -----------------------------------------------------
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})