var express = require('express');
var router = express.Router();
var http = require('http');
if (!process.env.WEATHER_ID) {
  require('dotenv').load();
}

router.get('/',
  function (req, res) {
    var weatherID = process.env.WEATHER_ID;
    http.get('http://api.openweathermap.org/data/2.5/weather?zip=02141,us&APPID=' + weatherID, function(res) {
      console.log("Got response: " + res.statusCode);
      console.log('pressure: ' + res.body.main.pressure);
      console.log('zipcode: ' + res.body.zipcode);
      res.resume();
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  });

module.exports = router;
