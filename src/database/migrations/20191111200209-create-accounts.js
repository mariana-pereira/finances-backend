'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bank: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      branch: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      account_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      account_balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      investments_balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('accounts');
  }
};
