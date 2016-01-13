var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');

var Cred = require('../models/Cred');


// Define Passport routes.
router.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

// router.get('/',
//   function (req, res) {
//     res.json({ title : (req.user && req.user.username) || 'Nobody' });
// });

router.get('/login',
  function (req, res) {
    res.render('login');
  });

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.sendStatus(200);
  });

router.post('/logout',
  function (req, res) {
    if(!req.session.passport.user) {
      var err = new Error("Log in first.");
      return next(err);
    }
    req.session.destroy(function (err) {
    });
    req.logout();
    res.sendStatus(200);
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });

router.post('/signup',
  function (req, res, next) {
    if(!req.body || !req.body.username || !req.body.password) {
      var err = new Error("No credentials.");
      return next(err);
    }
    // To hash password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    // Store hash in your password DB
    Cred.create({ username: req.body.username, password: hash }).then(function (user, err) {
      res.sendStatus(200);
    }).catch(function (err) {
      next(err);
    });
  });

// router.patch('/changePassword',
//   function (req, res, next) {
//     if(!req.body || !req.user || !req.body.password) {
//       var err = new Error("No password supplied.");
//       return next(err);
//     }
//     req.user.setPassword(req.body.password).
//       then(function() {
//         res.sendStatus(200);
//       }).catch(function (err) {
//         next(err);
//       });
//   });

module.exports = router;
