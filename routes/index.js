var express = require('express');
var router = express.Router();
var passport = require('passport');

var Cred = require('../models/Cred');


// Define Passport routes.
router.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login',
  function (req, res) {
    res.render('login');
  });

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });


module.exports = router;
