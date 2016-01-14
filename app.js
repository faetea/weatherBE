/*jshint node: true */
'use strict';

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var http = require('http');
if (!process.env.WEATHER_ID) {
  require('dotenv').load();
}

var Cred = require("./models/Cred");
var Weather = require("./models/Weather");
var Log = require("./models/Log");

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

app.use(require('cors')({
  origin: ['http://localhost:8080', 'null'],
  credentials: true
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/sync', require('./routes/sync'));
app.use('/pressure', require('./routes/pressure'));
app.use('/entries', require('./routes/entries'));
app.use('/health', require('./routes/health'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 10 * * * *',
  onTick: function() {
    /* Runs every day, every hour, 10 mins past the hour. */
    var weatherID = process.env.WEATHER_ID;
    var zipcode = '02141';
    http.get('http://api.openweathermap.org/data/2.5/weather?zip='+ zipcode +',us&APPID=' + weatherID, function (response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        var parsed = JSON.parse(body);
        console.log("Got response: " + response.statusCode);
        console.log('pressure: ' + parsed.main.pressure);

        Weather.create({
          pressure: parsed.main.pressure,
          humidity: parsed.main.humidity,
          temp: parsed.main.temp,
          cityname: parsed.name,
          cityid: parsed.id,
          // zipcode: zipcode
        }).then(function (weather, err) {
          console.log("weather update worked");
        }).catch(function (err) {
          console.log("weather update failed: " + err);
        });

      });
    }).on('error', function(e) {
      console.log("Got error from openWeatherMapAPI call: " + e.message);
    });
  },
  start: true,
  timeZone: 'America/New_York'
});

module.exports = app;
