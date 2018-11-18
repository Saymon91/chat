'use strict';
module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id          : {
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
        type         : Sequelize.BIGINT
      },
      parent_id   : {
        allowNull   : true,
        defaultValue: null,
        type        : Sequelize.BIGINT
      },
      from_id     : {
        allowNull   : true,
        defaultValue: null,
        type        : Sequelize.INTEGER
      },
      subject     : {
        allowNull   : true,
        defaultValue: null,
        type        : Sequelize.STRING(55)
      },
      content     : {
        allowNull: false,
        type     : Sequelize.TEXT
      },
      delivered_at: {
        allowNull   : true,
        defaultValue: null,
        type        : Sequelize.DATE
      },
      read_at     : {
        allowNull   : true,
        defaultValue: null,
        type        : Sequelize.DATE
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
    return queryInterface.dropTable('messages');
  }
};