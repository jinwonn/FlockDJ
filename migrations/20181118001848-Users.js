'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [ queryInterface.addColumn(
                  'Users',
                  'oauth',
                   Sequelize.STRING
                 ),
                queryInterface.addColumn(
                 'Users',
                 'profilePic',
                 Sequelize.STRING
              )];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
