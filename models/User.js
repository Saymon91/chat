'use strict';

const DEFAULT_STATUS = 0;

const statuses = {
  0: 'disabled',
  1: 'active'
};

module.exports = (sequelize, DataTypes) => {
  const BaseUser     = sequelize.define('User', {
    id       : DataTypes.BIGINT.UNSIGNED,
    uuid     : { type: DataTypes.UUID, allowNull: false },
    status   : { type: DataTypes.INTEGER, validate: { isIn: Object.keys(statuses) }, defaultValue: DEFAULT_STATUS },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at', },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null, field: 'deleted_at' },
  }, {
    indexes: [
      { fields: ['created_at'] },
      { fields: ['deleted_at'] },
      {
        unique: true,
        fields: ['uuid']
      }
    ],
    tableName: 'users'
  });
  BaseUser.associate = function (models) {
    // associations can be defined here
  };

  class User extends BaseUser {
    constructor(...args) {
      super(...args);

    }
  }

  return User;
};