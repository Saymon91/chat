'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
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
      .then(() => queryInterface.addIndex('chats', ['name']))
      .then(() => queryInterface.addIndex('chats', ['owner_id']))
      .then(() => queryInterface.addIndex('chats', ['created_at']))
      .then(() => queryInterface.addIndex('chats', ['owner_id', 'name'], { unique: true }))
      ;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chats');
  }
};