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
      chat_id   : {
        allowNull   : false,
        type        : Sequelize.INTEGER.UNSIGNED
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
        type        : Sequelize.JSON
      },
      content     : {
        allowNull: false,
        type     : Sequelize.JSON
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
    })
      .then(() => queryInterface.addIndex('messages', ['chat_id']))
      .then(() => queryInterface.addIndex('messages', ['parent_id']))
      .then(() => queryInterface.addIndex('messages', ['from_id']))
      .then(() => queryInterface.addIndex('messages', ['created_at']))
      ;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');
  }
};