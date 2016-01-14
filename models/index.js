var Sequelize = require('sequelize');

// connection via universal reference identifier
var sequelize = new Sequelize(
//  'postgres://faetea@localhost:5432/pressure'
  'process.env.DATABASE_URL'
);

module.exports = sequelize;
