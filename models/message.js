'use strict';
module.exports = (sequelize, DataTypes) => {
  const BaseMessage     = sequelize.define('Message', {
    id         : DataTypes.BIGINT.UNSIGNED,
    parentId   : { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, field: 'parent_id' },
    fromId     : { type: DataTypes.UUIDV4, field: 'from_id', allowNull: true },
    subject    : { type: DataTypes.STRING(55), allowNull: true, defaultValue: null },
    content    : { type: DataTypes.TEXT, allowNull: false },
    deliveredAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'delivered_at' },
    readAt     : { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'read_at' },
    createdAt  : { type: DataTypes.DATE, allowNull: true, defaultValue: new Date(), field: 'created_at', },
    updatedAt  : { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'updated_at' }
  }, {
    indexes: [
      {
        fields: ['created_at']
      },
      {
        fields: ['delivered_at']
      },
      {
        fields: ['parent_id']
      },
      {
        fields: ['sender_id']
      },
      {
        fields: ['receiver_id']
      }
    ],
    tableName: 'messages'
  });
  BaseMessage.associate = function (models) {
    // associations can be defined here
  };

  class Message extends BaseMessage {
    constructor(...args) {
      super(...args);

    }
  }

  return Message;
};