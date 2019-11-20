module.exports = (sequelize, DataTypes) => {
    const Investment = sequelize.define('Investment', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        tax: DataTypes.STRING,
        application_date: DataTypes.DATE,
        redeem_date: DataTypes.DATE,
        application_amount: DataTypes.DECIMAL,
        profits_amount: DataTypes.DECIMAL,
        total_amount: DataTypes.DECIMAL,
    });

    Investment.associate = models => {
        Investment.belongsTo(models.Account, { as: 'account', foreignKey: 'account_id' });
        Investment.belongsTo(models.Target, { as: 'target', foreignKey: 'target_id' });
        Investment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        //Investment.hasMany(models.Profit, {foreignKey: 'investment_id'});
    }

    return Investment;
}