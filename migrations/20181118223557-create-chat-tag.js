'use strict';
module.exports = {
  up  : (queryInterface, Sequelize) => {
    return queryInterface.createTable('chat-tags', {
      chat_id   : {
        allowNull: false,
        type     : Sequelize.INTEGER.UNSIGNED
      },
      tag_id    : {
        allowNull: false,
        type     : Sequelize.INTEGER.UNSIGNED
      },
      created_at: {
        allowNull: false,
        type     : Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type     : Sequelize.DATE
      }
    })
      .then(() => queryInterface.addConstraint('chat-tags',
        ['chat_id', 'tag_id'],
        { type: 'primary key', name: 'chat_tags_pk' }))
      .then(() => queryInterface.addIndex('chat-tags', ['chat_id']))
      .then(() => queryInterface.addIndex('chat-tags', ['tag_id']))
      .then(() => queryInterface.addIndex('chat-tags', ['created_at']))
      ;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chat-tags');
  }
};