const express = require('express')

const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema } = require('../schema/user')

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新用户头像的路由
router.post('/update/avatar', userinfo_handler.updateAvatar)

module.exports = router