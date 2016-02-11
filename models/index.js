var Sequelize = require('sequelize');

// connection via universal reference identifier
var sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;
