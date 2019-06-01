module.exports = function (sequelize, DataTypes) {
    return sequelize.define('zhoubao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'uid'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'title'
        },
        contentinfo: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'contentinfo'
        },
        emailinfo: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'emailinfo'
        }
    }, {
            freezeTableName: false
        });
}