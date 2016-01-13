var Sequelize = require('sequelize');
var sequelize = require('./index');

var Cred = sequelize.define('credentials', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    field: "pw_digest"
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Cred.sync().then(function () {
  // Table created
  return Cred.findOrCreate({where: {username: 'Moon'}, defaults: {password: 'bun'}});
  // return Cred.findOrCreate({
  //   username: 'Moon',
  //   password: 'bun'
  // });
});

module.exports = Cred;
