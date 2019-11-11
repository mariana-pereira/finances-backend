module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      bank: DataTypes.STRING,
      branch: DataTypes.STRING,
      account_number: DataTypes.STRING,
      type: DataTypes.STRING,
      account_balance: DataTypes.DECIMAL,
      investments_balance: DataTypes.DECIMAL,
    });
  
    Account.associate = models => {
        Account.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        //Account.hasMany(models.Investment, {foreignKey: 'account_id'});
        //Account.hasMany(models.Movimentation, {foreignKey: 'account_id'});
      }
  
    return Account;
  }