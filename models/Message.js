'use strict';

const { now } = require('util');

module.exports = (sequelize, DataTypes) => {
  const BaseMessage     = sequelize.define('Message', {
    id         : DataTypes.BIGINT.UNSIGNED,
    chatId     : { type: DataTypes.INTEGER, allowNull: false, field: 'chat_id' },
    parentId   : { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, defaultValue: null, field: 'parent_id' },
    fromId     : { type: DataTypes.INTEGER, allowNull: false, field: 'from_id' },
    subject    : { type: DataTypes.JSON },
    content    : { type: DataTypes.JSON },
    deliveredAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'delivered_at' },
    readAt     : { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'read_at' },
    createdAt  : { type: DataTypes.DATE, field: 'created_at' },
    updatedAt  : { type: DataTypes.DATE, field: 'updated_at' }
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

    async setDelivered() {
      this.deliveredAt = now();
      return await this.save();
    }

    async setRead() {
      this.readAt = now();
      return await this.save();
    }

  }

  return Message;
};