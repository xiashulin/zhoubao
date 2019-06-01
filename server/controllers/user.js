const UserModel = require('../models/user');

class userController {

    /**
     * 创建用户
     */
    static async create() {
        let req = this.request.body;
        if (req.name && req.nickname && req.password && req.headimg) {
            try {
                const ret = await UserModel.create(req);
                const data = await UserModel.getUserById(ret.id);

                this.response.status = 200;
                this.response.body = {
                    code: 200,
                    msg: 'success',
                    data
                };

            } catch (error) {
                this.response.status = 412;
                this.response.body = {
                    code: 412,
                    msg: 'fail',
                    data: error.errors[0].message
                };
            }
        } else {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
        }
    }

    /**
     * 获取用户详情
     */
    static async detail() {

        let { id = '', session } = this.request.body;
        if (!id && !session) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
            return;
        }

        if (session) id = session;

        try {

            let data =  await UserModel.getUserById(id);
            this.response.status = 200;
            this.body = {
                success: true,
                code: 200,
                msg: 'success',
                data
            };
        } catch (error) {
            this.response.status = 412;
            this.response.body = {
                code: 412,
                msg: 'fail',
                data: error
            };
        }
    }

    /**
     * 登录
     */
    static async login() {
        let req = this.request.body;
        console.log('login request:', JSON.stringify(req));

        if (!req.user && !req.pwd) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
        } else {
            let { user, pwd } = req;

            try {
                let data = await UserModel.getUserByName(user);

                if (!data) {
                    this.response.status = 401;
                    this.response.body = {
                        code: 401,
                        msg: 'inconrrect name',
                        data: null
                    };
                } else {
                    if (data.password != pwd ) { // md5(pwd)) {
                        this.response.status = 401;
                        this.response.body = {
                            code: 401,
                            msg: 'inconrrect pwd',
                            data: null
                        };
                    } else {
                        this.response.status = 200;
                        this.body = {
                            success: true,
                            code: 200,
                            msg: 'success',
                            data
                        };
                    }
                }

            } catch (ex) {
                this.response.status = 412;
                this.response.body = {
                    code: 412,
                    msg: 'fail',
                    data: error
                };
            }
        }
    }
}

module.exports = userController;