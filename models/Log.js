var Sequelize = require('sequelize');
var sequelize = require('./index');

var Log = sequelize.define('log', {
  pain: {
    type: Sequelize.INTEGER
  },
  mood: {
    type: Sequelize.INTEGER
  },
  note: {
    type: Sequelize.STRING
  },
  symptoms: {
    type: Sequelize.STRING
  },
  medication: {
    type: Sequelize.STRING
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Log.sync();

module.exports = Log;
