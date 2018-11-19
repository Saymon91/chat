'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag     = sequelize.define('Tag', {
    id       : DataTypes.BIGINT.UNSIGNED,
    name     : { type: DataTypes.STRING, allowNull: false },
    ownerId  : { type: DataTypes.BIGINT, allowNull: false, field: 'owner_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    tableName: 'tags',
    indexes: [
      { fields: ['name'] },
      { fields: ['owner_id'] },
      { unique: true, fields: ['name', 'owner_id'] },
      { fields: ['created_at'] }
    ]
  });
  Tag.associate = function (models) {
    // associations can be defined here
  };
  return Tag;
};