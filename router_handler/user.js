// 导入数据库操作模块
const db = require('../db/index')

// 导入bcryptjs包
// 后续使用这个包进行密码加密
const bcrypt = require('bcryptjs')

// 导入jsonwebtoken包，后续使用这个包生成token字符串
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
        // 判断数据是否合法
    if (!userinfo.username || !userinfo.password)
        return cc('用户名或密码错误')
            // 定义sql语句，检查用户名是否重复
    const sql = `select * from ev_users where username=?`
    db.query(sql, [userinfo.username], (err, results) => {
        if (err) return res.cc(err)
            // 检查用户名是否重复
        if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名')

        // 调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const insertSql = `insert into ev_users set ?`
        db.query(insertSql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err)
                return res.cc(err)
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            res.cc('注册成功！', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    // 接受表单数据
    const userinfo = req.body
        // 定义sql语句
    const sql = "select * from ev_users where username=?"
        // 执行sql语句，根据用户名查询用户的信息
    db.query(sql, userinfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
            // 执行sql语句成功，但是获取到的数据条数不等于1
        if (results.length !== 1) return res.cc('登录失败！')

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误')

        // 在服务器端生成token字符串
        const user = {...results[0], password: "", user_pic: "" }
            // 对用户的信息进行加密，生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            // 调用res.send将token响应给客户端
        res.send({
            status: 0,
            message: "登录成功",
            token: 'Bearer ' + tokenStr
        })
    })

}