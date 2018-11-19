'use strict';

module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.createTable('message_directions', {
      owner_id   : {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      name       : {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      created_at : {
        allowNull: false,
        type     : Sequelize.DATE
      },
      updated_at : {
        allowNull: false,
        type     : Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('message_directions', ['owner_id', 'name'], {
      type: 'primary key',
      name: 'message_directions_pk'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('message_directions');
  }
};