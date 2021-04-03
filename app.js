var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let index = require('./routes/index');
let admin = require('./routes/admin');
let reservations = require('./routes/reservations');

const auth = require('./lib/middleware/auth.js');

const configuration = {}











if (1) {

}

var app = express();

// Static assets.
// Move this after the logger if you want to log requests for static assets.
// Uncomment when you've added a favicon to your project.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

// Impenetrable security.
app.use('/admin', auth('admin', 'admin'))
app.use('/admin', admin);

app.use('/reservations', reservations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
