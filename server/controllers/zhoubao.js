const ZhoubaoModel = require('../models/zhoubao');

class zhoubaoController {
    static async create() {
        let req = this.request.body;

        if (req.session && req.title && req.contentinfo) {
            try {
                req['uid'] = req.session;
                const ret = await ZhoubaoModel.create(req);
                const data = await ZhoubaoModel.getZhoubaoByUIdAndTitle(ret.uid, req.title);

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

    static async list () {
        let {session} = this.request.body;

        if(!session) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
            return; 
        }

        try {
            let data = await ZhoubaoModel.getZhoubaoListByUId(req.session);
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

    static async detail() {

        let { session, title, uid } = this.request.body;
        if (!title || !session) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
            return;
        }

        if (session) uid = session;

        try {
            let data = await ZhoubaoModel.getZhoubaoByUIdAndTitle(uid, title);
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

    static async update() {
        let req = this.request.body;
        console.log('login request:', JSON.stringify(req));

        if (!req.session || !req.title || !req.contentinfo) {
            this.response.status = 416;
            this.response.body = {
                code: 416,
                msg: 'invalid input'
            };
        } else {
            try {
                const ret = await ZhoubaoModel.uptZhoubaoByUIDAndTitle(req.session, req.title, req.contentinfo, req.emailinfo || '[]');
                const data = await ZhoubaoModel.getZhoubaoByUIdAndTitle(req.session, req.title);

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
}

module.exports = zhoubaoController;