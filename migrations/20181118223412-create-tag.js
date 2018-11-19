'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.BIGINT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addIndex('tags', ['name', 'owner_id'], { unique: true }))
      .then(() => queryInterface.addIndex('tags', ['name']))
      .then(() => queryInterface.addIndex('tags', ['owner_id']))
      .then(() => queryInterface.addIndex('tags', ['created_at']))
      ;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags');
  }
};