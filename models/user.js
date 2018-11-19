'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    oauth: DataTypes.STRING,
    profilePic: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    belongsTo(models.Room, {
      foreignKey : 'roomId'
    });
  };
  return User;
};