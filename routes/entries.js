var express = require('express');
var router = express.Router();

var Log = require('../models/Log');

// createEntry
router.post('/',
  function (req, res) {
    console.log(req.body);
    Log.create({
      pain: req.body.pain,
      mood: req.body.mood,
      note: req.body.note,
      symptoms: req.body.symptoms,
      medication: req.body.medication,
    }).then(function (entry, err) {
      res.sendStatus(200);
    }).catch(function (err) {
      next(err);
    });
  });


// showList
router.get('/',
  function (req, res) {
  // stuuff
  });


// missing edit/update
// missing delete

module.exports = router;
