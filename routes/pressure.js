/*jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();

var Weather = require('../models/Weather');

// range /pressure?weeks=1
router.get('/', function (req, res, next) {
  var numWeeks = req.query.weeks;
  var millisecondsInWeek = (7 * 24 * 3600000);
  var endDate = new Date(), startDate = new Date();
	startDate.setTime(endDate.getTime() - (numWeeks * millisecondsInWeek));
  console.log(startDate);
  console.log(endDate);
  Weather.findAll({
    where: {
      city_id: '4931972',
      createdAt: {
        $gt: startDate,
        $lt: endDate
      }
    },
		attributes: ['pressure', 'createdAt']
  }).then(function (weathers) {
    console.log(startDate);
    console.log(endDate);
    var results = {pressures: [], createdAts: []};
		for (var i = 0; i < weathers.length; i++) {
      results.pressures.push(weathers[i].dataValues.pressure);
			var date = new Date(weathers[i].dataValues.createdAt);
			var options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit" };
			results.createdAts.push(new Intl.DateTimeFormat('en-us', options).format(date));
			// results.createdAts.push(weathers[i].dataValues.createdAt);
		}
		res.json(results);
	});
});


module.exports = router;
