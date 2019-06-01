var router              = require('koa-router')();
var UserController      = require('../controllers/user');
var UserEmailController = require('../controllers/user_email');
var ZhoubaoController   = require('../controllers/zhoubao');

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.get('/foo', function *(next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  });
});

router.post('/user/create', UserController.create);
router.get('/user/:id', UserController.detail);
router.get('/user/:name', UserController.detail);
router.post('/user/login', UserController.login);
router.post('/user/userInfo', UserController.detail);


router.post('/useremail/get', UserEmailController.detail);
router.post('/useremail/add', UserEmailController.create);
router.post('/useremail/update', UserEmailController.update);
router.post('/useremail/send', UserEmailController.send);


router.post('/zhoubao/add', ZhoubaoController.create);
router.post('/zhoubao/detail', ZhoubaoController.detail);
router.post('/zhoubao/list', ZhoubaoController.list);
router.post('/zhoubao/update', ZhoubaoController.update);


module.exports = router;
