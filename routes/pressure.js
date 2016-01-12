/*jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();

var Weather = require('../models/Weather');

router.get('/',
  function (req, res, next) {
    Weather.findAll({
      where: { city_id: '4931972' },
      attributes: ['pressure', 'createdAt']
    }).then(function(weathers) {
      var results = {pressures: [], createdAts: []};
      for (var i = 0; i < weathers.length; i++) {
        results.pressures.push(weathers[i].dataValues.pressure);
        var date = new Date(weathers[i].dataValues.createdAt);
        var options = {
          year: "numeric", month: "short",
          day: "numeric", hour: "2-digit"
        };
        results.createdAts.push(new Intl.DateTimeFormat('en-us', options).format(date));
        // results.createdAts.push(weathers[i].dataValues.createdAt);
      }
      res.json(results);
    });
  });

module.exports = router;
