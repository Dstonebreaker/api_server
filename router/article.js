const express = require('express')

const router = express.Router()

// 导入multer和path
const multer = require('multer')
const path = require('path')
    // 创建multer实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')

// 导入文章管理的处理函数模块
const article_handler = require('../router_handler/article')

// 发布文章的路由
// uploads.single是一个局部生效的中间件，用来解析FormData格式的表单数据
// 将文件类型的数据，解析并挂载到req.file属性中
// 将非文件类型的数据，解析并挂载到req.body属性中
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

module.exports = router