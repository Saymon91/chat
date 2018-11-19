'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatTag     = sequelize.define('ChatTag', {
    chatId   : { type: DataTypes.INTEGER, field: 'chat_id', allowNull: false },
    tagId    : { type: DataTypes.INTEGER, field: 'tag_id', allowNull: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at', allowNull: false },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: false },
  }, {
    tableName: 'chat-tags',
    indexes  : [
      { fields: ['created_at'] },
      { fields: ['chat_id'] },
      { fields: ['tag_id'] },
    ]
  });
  ChatTag.associate = function (models) {
    // associations can be defined here
  };
  return ChatTag;
};