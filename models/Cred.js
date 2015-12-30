var Sequelize = require('sequelize');
var sequelize = require('./index');

var Cred = sequelize.define('credentials', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

console.log("running");

Cred.sync({force: true}).then(function () {
  // Table created
  return Cred.create({
    username: 'Moon',
    password: 'bun'
  });
});
