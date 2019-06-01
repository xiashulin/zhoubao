const db = require('../config/db');
const md5 = require('md5');
const Sequelize = db.sequelize;

const User = Sequelize.import('../schema/user');
User.sync({ force: false }); //自动建表

class UserModel {
    static async create(data) {
        return await User.create({
            name: data.name,
            nickname: data.nickname,
            password: md5(data.password),
            headimg: data.headimg
        });
    }

    static async getUserById(id) {
        return await User.findOne({ where: { id } });
    }

    static async getUserByName(name) {
        return await User.findOne({ where: { name } });
    }
}

module.exports = UserModel;