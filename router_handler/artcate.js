// 导入数据库操作模块
const res = require('express/lib/response')
const db = require('../db/index')

// 获取文章分类 的 处理函数
exports.getArticleCates = (req, res) => {
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length <= 0) return res.cc('获取文章分类列表失败！')
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}

// 新增文章分类 的 处理函数
exports.addArticleCates = (req, res) => {
    // 1. 验证是否已存在同名文章分类
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('别名被占用，请更换后重试！')

        // 查重结果合格，添加文章分类
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}

// 根据id删除文章分类
exports.deleteCatesById = (req, res) => {
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("删除文章分类失败！")
        res.cc("删除文章分类成功！", 0)
    })
}

exports.getArticleCatesById = (req, res) => {
    const sql = `select * from ev_article_cate where id=? and is_delete=0`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取文章分类失败！")
        res.send({
            status: 0,
            message: "获取文章分类数据成功！",
            data: results[0]
        })
    })
}

exports.updateArtCatesById = (req, res) => {
    const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('别名被占用，请更换后重试！')

        const sql = `update ev_article_cate set ? where id = ?`
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("修改文章分类失败！")
            res.cc("修改文章分类成功", 0)
        })
    })
}