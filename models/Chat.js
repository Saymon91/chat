'use strict';

const DEFAULT_STATUS = 1;
const STATUSES = {
  0: 'closed',
  1: 'active'
};

module.exports = (sequelize, DataTypes) => {
  const Chat     = sequelize.define('Chat', {
    id         : DataTypes.BIGINT.UNSIGNED,
    name       : { type: DataTypes.STRING,  },
    description: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    owner_id   : { type: DataTypes.BIGINT, allowNull: false },
    status     : { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: DEFAULT_STATUS, validate: { isIn: Object.keys(STATUSES) } },
    createdAt  : { type: DataTypes.DATE, field: 'created_at', allowNull: false },
    updatedAt  : { type: DataTypes.DATE, field: 'updated_at', allowNull: false }
  }, {
    tableName: 'chats',
    indexes: [
      { fields: ['created_at'] },
      { fields: ['owner'] }
    ],
  });
  Chat.associate = function (models) {
    // associations can be defined here
  };
  return Chat;
};