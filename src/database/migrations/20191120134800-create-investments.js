'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('investments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tax: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      application_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      redeem_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      application_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      profits_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      total_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      target_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Targets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      account_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
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
    return queryInterface.dropTable('investments');
  }
};
