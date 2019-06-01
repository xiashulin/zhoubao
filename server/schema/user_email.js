module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_email', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: 'uid'
        },
        sendaddress: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sendaddress'
        },
        sendpwd: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sendpwd'
        },
        receiveaddress: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'receiveaddress'
        }
    }, {
            freezeTableName: true
        });
}