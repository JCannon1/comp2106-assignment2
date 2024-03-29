var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// references we added
const mongoose = require('mongoose');
const config = require('./config/globals');

// auth packages
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

var index = require('./routes/index');
// var users = require('./routes/users');
const groceries = require('./routes/groceries');
// const ejsLint = require('ejs-lint');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
mongoose.connect(config.db);

// passport configuration
app.use(session({
  secret: 'any string for salting here',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// reference User model
const User = require('./models/user');

passport.use(User.createStrategy());

// google auth strategy
passport.use(new googleStrategy({
 clientID: config.google.googleClientId,
 clientSecret: config.google.googleClientSecret,
 callbackURL: config.google.googleCallbackUrl,
  profileFields: ['id', 'emails']
},
  (accessToken, refreshToken, profile, callback) => {
      User.findOrCreate({
          googleId: profile.id,
          username: profile.emails[0].value
      }, (err, user) => {
          return callback(err, user);
      });
  }
));

// session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);
// app.use('/users', users);
app.use('/groceries', groceries);

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







