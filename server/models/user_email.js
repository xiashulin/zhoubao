const db = require('../config/db');
const Sequelize = db.sequelize;

const UserEmail = Sequelize.import('../schema/user_email');
UserEmail.sync({ force: false }); //自动建表

class UserModel {
    static async create(data) {
        return await UserEmail.create({
            uid: data.uid,
            sendaddress: data.sendaddress,
            sendpwd: data.sendpwd,
            receiveaddress: data.receiveaddress
        });
    }

    static async getUserEmailByUId(uid) {

        return await UserEmail.findOne({ where: { uid } });

    }

    static async uptUserEmailByUID(uid, sendaddress, sendpwd, receiveaddress) {

        return await UserEmail.update({sendaddress, sendpwd, receiveaddress}, { where: { uid: Number(uid)}});

    }
}

module.exports = UserModel;