'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat     = sequelize.define('Chat', {
    id         : DataTypes.BIGINT.UNSIGNED,
    name       : { DataTypes.STRING,
    description: DataTypes.STRING,
    owner      : DataTypes.BIGINT,
    createdAt  : DataTypes.DATE,
    updated_at : DataTypes.DATE
  }, {
    tableName: 'chats',
  });
  Chat.associate = function (models) {
    // associations can be defined here
  };
  return Chat;
};