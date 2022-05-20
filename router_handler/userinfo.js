const db = require('../db/index')


// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    const sql = `select id, username, nickname, email, user_pic from ev_users where id = ?`
        // 只要身份认证成功，中间件会在req上挂载一个user属性
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败')
        res.cc('更新用户信息成功！', 0)
    })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    res.send('ok')
}