var router = require('express').Router();
var AV = require('leanengine');
var baseAPP = 'yike';

router.get('/', function(req, res, next) {
  var APP_ID = process.env.LC_APP_ID;
  var APP_KEY = process.env.LC_APP_KEY;
  var MASTER_KEY = process.env.LC_APP_MASTER_KEY;
  if (req.AV.user) {
    res.render('admin', {baseAPP: baseAPP, APP_ID: APP_ID, APP_KEY: APP_KEY, MASTER_KEY: MASTER_KEY});
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', {error: false});
});

router.post('/login', function(req, res, next) {
  AV.User.logIn(req.body.username, req.body.password).then(function() {
    //登录成功，avosExpressCookieSession会自动将登录用户信息存储到cookie
    //跳转到profile页面。
    console.log('signin successfully: %j', req.AV.user);
    res.redirect('/admin');
  },function(error) {
    console.log(error);
    //登录失败，跳转到登录页面
    res.render('login', {error: '账号密码错误'});
  });
});

//查看用户profile信息
router.get('/profile', function(req, res) {
  // 判断用户是否已经登录
  if (req.AV.user) {
    // 如果已经登录，发送当前登录用户信息。
    res.send(req.AV.user);
  } else {
    // 没有登录，跳转到登录页面。
    res.redirect('/admin/login');
  }
});

//调用此url来登出帐号
router.get('/logout', function(req, res) {
  //avosExpressCookieSession将自动清除登录cookie信息
  AV.User.logOut();
  res.redirect('/admin/login');
});

module.exports = router;
