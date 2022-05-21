// 这是文章分类的路由模块
const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')

const { add_cate_schema, delete_cate_schema, get_cate_schema, updata_cate_schema } = require('../schema/artcate')

// 导入 文章分类 的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 获取文章分类 的路由
router.get('/cates', artcate_handler.getArticleCates)

// 新增文章分类 的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 根据id删除文章分类 的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCatesById)

// 根据id获取文章分类数据 的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleCatesById)

// 根据id更新文章分裂数据 的路由
router.post('/updatecate', expressJoi(updata_cate_schema), artcate_handler.updateArtCatesById)

module.exports = router