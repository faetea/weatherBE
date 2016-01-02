var Sequelize = require('sequelize');
var sequelize = require('./index');

var Weather = sequelize.define('weather', {
  pressure: {
    type: Sequelize.INTEGER
  },
  humidity: {
    type: Sequelize.INTEGER
  },
  temp: {
    type: Sequelize.FLOAT
  },
  cityname: {
    type: Sequelize.STRING,
    field: "city_name"
  },
  cityid: {
    type: Sequelize.STRING,
    field: "city_id"
  },
  zipcode: {
    type: Sequelize.INTEGER
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Weather.sync();

module.exports = Weather;
