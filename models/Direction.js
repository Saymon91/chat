'use strict';

const { now } = require('util');

module.exports = (sequelize, DataTypes) => {
    const BaseMessage = sequelize.define('Direction', {
        messageId   : { type: DataTypes.BIGINT.UNSIGNED, field: 'message_id', allowNull: false },
        to          : { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        deliveredAt : { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'delivered_at' },
        readAt      : { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'read_at' },
        createdAt   : { type: DataTypes.DATE, allowNull: true, field: 'created_at', },
        updatedAt   : { type: DataTypes.DATE, allowNull: true, field: 'updated_at' }
    }, {
        indexes: [
            {
                fields: ['created_at']
            },
            {
                fields: ['delivered_at']
            },
            {
                fields: ['read_at']
            },
            {
                fields: ['to']
            },
            {
                fields: ['message_id']
            }
        ],
      tableName: 'messages_to_users'
    });
    BaseMessage.associate = function(models) {
        // associations can be defined here
    };

    class Message extends BaseMessage {
        constructor(...args) {
            super(...args);

        }
    }

    return Message;
};