'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chats', {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      owner: {
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
    }).then(() => queryInterface.addConstraint('Users', ['firstName', 'lastName'], {
      type: 'primary key',
      name: 'users_pkey'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chats');
  }
};