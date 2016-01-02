var express = require('express');
var router = express.Router();
var passport = require('passport');

var Cred = require('../models/Cred');


// Define Passport routes.
router.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

// router.get('/',
//   function (req, res) {
//     res.json({ title : (req.user && req.user.userName) || 'Nobody' });
// });

router.get('/login',
  function (req, res) {
    res.render('login');
  });

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
    res.sendStatus(200);
  });

router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

// router.get('/logout',
//   function (req, res, next) {
//     if(!req.user) {
//       var err = new Error("Log in first.");
//       return next(err);
//     }
//     req.logout();
//     res.sendStatus(200);
//   });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });

router.post('/signup',
  function (req, res, next) {
    console.log(req.body.username);
    if(!req.body || !req.body.username || !req.body.password) {
      var err = new Error("No credentials.");
      return next(err);
    }
    console.log("HERE");
    Cred.create({ username: req.body.username, password: req.body.password }).then(function (user, err) {
      console.log('user: ', user);
      console.log('err: ', err);
      res.sendStatus(200);
    }).catch(function(err){
      console.log('err: ', err);
    });
    // var pUser = new Promise(function (res, rej) {
    //   User.create({ username : req.body.username },
    //   function (err, user) {
    //     if(err) {
    //       rej(err);
    //       return;
    //     }
    //     res(user);
    //   });
    // });
    // pUser.then(function (user) {
    //   return user.setPassword(req.body.password);
    // }).then(function() {
    //   res.sendStatus(200);
    // }).catch(function (err) {
    //   next(err);
    // });
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
