const db = require('../config/db');
const Sequelize = db.sequelize;

const Zhoubao = Sequelize.import('../schema/zhoubao');
Zhoubao.sync({ force: false }); //自动建表

class UserModel {
    static async create(data) {
        return await Zhoubao.create({
            uid: data.uid,
            title: data.title,
            contentinfo: data.contentinfo,
            emailinfo: data.emailinfo
        });
    }

    static async getZhoubaoListByUId(uid) {

        return await Zhoubao.findAll({ where: { uid } });

    }

    static async getZhoubaoByUIdAndTitle(uid, title) {

        return await Zhoubao.findOne({ where: { uid, title } });

    }

    static async uptZhoubaoByUIDAndTitle(uid, title, contentinfo, emailinfo) {

        return await Zhoubao.update({ contentinfo, emailinfo }, { where: { uid, title } });

    }
}

module.exports = UserModel;