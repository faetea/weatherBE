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
        results.createdAts.push(weathers[i].dataValues.createdAt);
      }
      res.json(results);
    });
  });

module.exports = router;


// var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
// US English uses month-day-year order
// console.log(new Intl.DateTimeFormat('en-US').format(date));
// → "12/19/2012"
