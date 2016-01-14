/*jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();

var Log = require('../models/Log');

router.get('/',
  function (req, res, next) {
    var userID = req.session.passport.user;
    Log.findAll({
      where: { authorId: userID },
      attributes: ['pain', 'mood', 'createdAt']
    }).then(function (logs) {
      var results = {pains: [], moods:[], createdAts: []};
      for (var i = 0; i < logs.length; i++) {
        results.pains.push(logs[i].dataValues.pain);
        results.moods.push(logs[i].dataValues.mood);
        results.createdAts.push(new Intl.DateTimeFormat('en-us', {
          year: "numeric", month: "short", day: "numeric", hour: "2-digit"
        }).format(new Date(logs[i].dataValues.createdAt)));
      }
      res.json(results);
    });
  });

module.exports = router;
