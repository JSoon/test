var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const rp = require('request-promise');


var index = require('./routes/index');
var users = require('./routes/users');
var live = require('./routes/live');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/video/live', live);

app.use('/api/test', function (req, res) {
  console.log('/api/test');

  var url = 'http://music.migu.cn/music-migu-web/migumusic/user/571622ad-73c8-4507-87d2-44b644b2f7a3/playlists?listType=0&pageSize=50&pageNo=1';

  rp({
    method: 'GET',
    uri: url,
    // qs: {
    //   listType: 0,
    //   pageSize: 50,
    //   pageNo: 1
    // },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true,
    timeout: 10000
  }).then(function (response) {
    res.json(response);
  }).catch(function(err) {
    console.error(err);
  });

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;