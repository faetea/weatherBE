var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var Cred = require("./models/Cred");
var Weather = require("./models/Weather");

// Configure the local strategy for use by Passport.
passport.use(new Strategy(
  function (username, password, cb) {
    Cred.findOne({ where: {username: username} }).then(function (user, err) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      // To check password, Load hash from your password DB
      if (!bcrypt.compareSync(password, user.password)) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  Cred.findById(id).then(function (user, err) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


var routes = require('./routes/index');
var users = require('./routes/users');
var sync = require('./routes/sync');

var app = express();


// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Use application-level middleware for common functionality, including logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('body-parser').json({ extended: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/sync', sync);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
