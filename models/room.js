'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    roomName: DataTypes.STRING,
    queue: DataTypes.STRING,
    staged: DataTypes.STRING,
    playing: DataTypes.STRING
  }, {});
  Room.associate = function(models) {
    //1 to many with user
    Room.hasMany(models.User, {
      foreignKey: 'roomId'
    });
  };
  return Room;
};