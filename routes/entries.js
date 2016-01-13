var express = require('express');
var router = express.Router();

var Log = require('../models/Log');

// createEntry
router.post('/',
  function (req, res) {
    console.log(req.body);
    var userID = req.session.passport.user;
    if(!userID) { //the user is not logged in
      res.sendStatus(401);
      return;
    }
    Log.create({
      pain: req.body.pain,
      mood: req.body.mood,
      note: req.body.note,
      symptoms: req.body.symptoms,
      medication: req.body.medication,
      authorId: userID,
    }).then(function (entry, err) {
      res.sendStatus(200);
    }).catch(function (err) {
      next(err);
    });
  });

// showList
router.get('/',
  function (req, res) {
    var userID = req.session.passport.user;
    Log.findAll({
      where: { authorId: userID },
      // attributes: ['pressure', 'createdAt']
    }).then(function (logs) {
      var results = {logs:[]};
      for (var i = 0; i < logs.length; i++) {
        results.logs.push(logs[i].dataValues);
      }
      res.json(results);
    });
  });


// missing edit/update
// missing delete

module.exports = router;
