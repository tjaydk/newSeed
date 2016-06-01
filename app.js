// imports
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var validator       = require('validator');
var session         = require("express-session");
var RedisStore      = require("connect-redis")(session);

//passport
var passport        = require('passport');
var passportConfig  = require("./config/passport");
passportConfig(passport);


var routes          = require('./routes/index');
var users           = require('./routes/users');
var signup          = require('./routes/signup');
var restApi         = require('./routes/api');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//CREATING A SESSION ID WITH EXPRESS SESSION AND USE REDIS TO STORE
app.use(session({
  store: new RedisStore({
    host: "localhost",
    port: 6379
  }),
  secret: "This is a secret"
}));

app.use('/', routes);
app.use('/users', users);
app.use('/signup', signup);
app.use('/api', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if (err) { res.status(403).json({mesage:"Token could not be authenticated",fullError: err}) }
    if (user) { return next(); }
    return res.status(403).json({mesage: "Token could not be authenticated", fullError: info});
  })(req, res, next);
});

app.use('/api', restApi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
