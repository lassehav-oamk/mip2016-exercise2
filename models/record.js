'use strict';
module.exports = function(sequelize, DataTypes) {
  var Record = sequelize.define('Record', {
    grade: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Record.belongsTo(models.Student);
        Record.belongsTo(models.Course);
      }
    }
  });
  return Record;
};