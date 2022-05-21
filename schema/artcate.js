// 导入定义验证规则的模块
const joi = require('joi')

// 定义 name 和 alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 向外共享验证规则对象
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 删除分类 - 验证规则对象
const id = joi.number().min(1).required()
exports.delete_cate_schema = {
    params: {
        id
    }
}

exports.get_cate_schema = {
    params: {
        id
    }
}

exports.updata_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}