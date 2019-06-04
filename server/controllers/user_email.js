const UserEmailModel = require('../models/user_email');
const UserModel = require('../models/user');
const ZhoubaoModel = require('../models/zhoubao');
const mail = require('../lib/mail');
const generateHtml = require('../lib/zhoubaomailhtml');
const moment = require('moment');

class userEmailController {

    /**
     * 创建用户邮箱信息
     */
    static async create() {
        let req = this.request.body;
        if (req.session && req.sendaddress && req.sendpwd && req.receiveaddress) {
            try {
                req['uid'] = req.session;
                const ret = await UserEmailModel.create(req);
                const data = await UserEmailModel.getUserEmailByUId(ret.uid);

                this.response.status = 200;
                this.response.body = {
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
     * 获取用户用户邮箱信息详情
     */
    static async detail() {

        let { uid = '', session } = this.request.body;
        if (!uid && !session) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
            return;
        }

        if (session) uid = session;

        try {
            let data = await UserEmailModel.getUserEmailByUId(uid);
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
     * 修改
     */
    static async update() {
        let req = this.request.body;
        console.log('login request:', JSON.stringify(req));

        if (!req.session && !req.sendaddress && !req.sendpwd && !req.receiveaddress) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
        } else {
            try {
                const ret = await UserEmailModel.uptUserEmailByUID(req.session, req.sendaddress, req.sendpwd, req.receiveaddress);

                const data = await UserEmailModel.getUserEmailByUId(Number(req.session));

                this.response.status = 200;
                this.response.body = {
                    success: true,
                    code: 200,
                    msg: 'success',
                    data
                };

            } catch (ex) {
                this.response.status = 412;
                this.response.body = {
                    code: 412,
                    msg: 'fail',
                    data: ex
                };
            }
        }
    }

    static async send() {
        // TODO：发送邮件
        // 获取参数uid,title
        // 获取邮箱信息，获取周报信息
        // 准备邮件内容
        // 调用发送邮件的方法
        // 返回
        let req = this.request.body

        if (!req.session && !req.title) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
        } else {
            let uid = req.session
            try {
                let emailData = await UserEmailModel.getUserEmailByUId(uid)
                let userInfo = await UserModel.getUserById(uid);
                if (!userInfo || !emailData || (!emailData.sendaddress || !emailData.sendpwd || !emailData.receiveaddress)) {
                    // 返回，邮箱没有设置
                    this.response.status = 200;
                    this.response.body = {
                        success: true,
                        code: -1,
                        msg: 'emailinfo is null'
                    };
                    return;
                }

                let zhoubaoData = await ZhoubaoModel.getZhoubaoByUIdAndTitle(uid, req.title)
                if (!zhoubaoData || zhoubaoData.contentinfo === '[]') {
                    // 返回，周报没有数据
                    this.response.status = 200;
                    this.response.body = {
                        success: true,
                        code: -2,
                        msg: 'zhoubao is null'
                    };
                    return;
                }

                let html = generateHtml.generateHtml(userInfo.name, zhoubaoData.title, JSON.parse(zhoubaoData.contentinfo), moment.format('YYYY-MM-DD'))
                let sendRes = null, mailInfo = zhoubaoData.emailinfo
                if (!mailInfo || mailInfo == '[]') mailInfo = []
                else mailInfo = JSON.parse(mailInfo)
                try {
                    await mail.send(emailData.sendaddress, emailData.sendpwd, emailData.sendaddress, emailData.receiveaddress, zhoubaoData.title, '', html)

                    sendRes = `${Date.now()}|${emailData.sendaddress}|${emailData.receiveaddress}|send_success`

                    mailInfo.push(sendRes)

                    await ZhoubaoModel.uptZhoubaoByUIDAndTitle(uid, req.title, zhoubaoData.contentinfo, JSON.stringify(mailInfo))

                    this.response.status = 200;
                    this.response.body = {
                        success: true,
                        code: 200,
                        msg: 'success'
                    };

                } catch (mailEx) {
                    sendRes = `${Date.now()}|${emailData.sendaddress}|${emailData.receiveaddress}|send_fail:${mailEx.message}`

                    mailInfo.push(sendRes)

                    await ZhoubaoModel.uptZhoubaoByUIDAndTitle(uid, req.title, zhoubaoData.contentinfo, JSON.stringify(mailInfo))

                    this.response.status = 200;
                    this.response.body = {
                        success: true,
                        code: 201,
                        msg: '发送邮件报错，请检查邮箱信息或网络'
                    };
                }

            } catch (ex) {
                this.response.status = 412;
                this.response.body = {
                    code: 412,
                    msg: 'fail',
                    data: ex
                };
            }
        }
    }
}

module.exports = userEmailController;