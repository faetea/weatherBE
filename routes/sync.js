var express = require('express');
var router = express.Router();
var http = require('http');
if (!process.env.WEATHER_ID) {
  require('dotenv').load();
}

router.get('/',
  function (req, res) {
    var weatherID = process.env.WEATHER_ID;
    http.get('http://api.openweathermap.org/data/2.5/weather?zip=02141,us&APPID=' + weatherID, function (response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('end', function() {
        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);
        console.log("Got response: " + res.statusCode);
        console.log('pressure: ' + parsed.main.pressure);
        console.log('zipcode: ' + parsed.zipcode);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
    res.sendStatus(200);
  });

module.exports = router;
