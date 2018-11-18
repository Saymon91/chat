'use strict';
module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id          : {
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
        type         : Sequelize.BIGINT
      },
      uuid   : {
        allowNull   : false,
        type        : Sequelize.UUID
      },
      status     : {
        allowNull   : false,
        type        : Sequelize.INTEGER
      },
      created_at  : {
        allowNull: false,
        type     : Sequelize.DATE
      },
      updated_at  : {
        allowNull   : true,
        defaultValue: null,
        type        : Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};