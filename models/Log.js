var Sequelize = require('sequelize');
var sequelize = require('./index');

var Cred = require('../models/Cred');

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

Log.belongsTo(Cred, {as: 'author'}); // Adds RoleId to user rather than UserRoleId

Log.sync();

module.exports = Log;
