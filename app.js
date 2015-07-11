var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require('./routes/user');
var cloud = require('./cloud');
var AV = require('leanengine');


var app = express();
var APP_ID = process.env.LC_APP_ID;

// 加载云代码方法
app.use(cloud);

// 设置 view 引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('YiAppAdmin'));
app.use(session({ secret: 'YiAppAdmin', key: 'YiAppAdmin', cookie: { secure: false } }));
app.use(AV.Cloud.CookieSession({ secret: 'YiAppAdmin', maxAge: 3600000, fetchUser: true }));

switch (APP_ID) {
  case 'ry3vkr5qo327u3zxk62ifezixglq2lqfmutkthm0c050z9j9':
    var YikeAdmin = require('./routes/yike/admin');

    app.get('/', function(req, res) {
      res.send('ok');
    });
    app.use('/admin', YikeAdmin);
    break;
}

app.use('/admin/user', user);


// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

AV.Cloud.useMasterKey();


module.exports = app;
