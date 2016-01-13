/*jshint node: true */
'use strict';

var express = require('express');
var router = express.Router();

var Weather = require('../models/Weather');

var http = require('http');
if (!process.env.WEATHER_ID) {
  require('dotenv').load();
}

router.get('/',
  function (req, res, next) {
    var weatherID = process.env.WEATHER_ID;
    http.get('http://api.openweathermap.org/data/2.5/weather?zip=02141,us&APPID=' + weatherID, function (response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        var parsed = JSON.parse(body);
        console.log("Got response: " + res.statusCode);
        console.log('pressure: ' + parsed.main.pressure);

        Weather.create({
          pressure: parsed.main.pressure,
          humidity: parsed.main.humidity,
          temp: parsed.main.temp,
          cityname: parsed.name,
          cityid: parsed.id,
          // zipcode: zipcode
        }).then(function (weather, err) {
          res.sendStatus(200);
        }).catch(function (err) {
          next(err);
        });

      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  });

module.exports = router;
