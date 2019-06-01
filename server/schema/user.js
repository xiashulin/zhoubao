module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'name'
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nickname'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        headimg: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'headimg'
        },
        ctime: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW()
        },
        updatetime: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW()
        }
    }, {
            freezeTableName: false
        });
}