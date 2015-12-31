var Sequelize = require('sequelize');
var sequelize = require('./index');

var Cred = sequelize.define('credentials', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    field: "pw_digest"
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Cred.sync({force: true}).then(function () {
  // Table created
  return Cred.create({
    username: 'Moon',
    password: 'bun'
  });
});
