module.exports = (sequelize, DataTypes) => {
    const Movimentation = sequelize.define('Movimentation', {
        date: DataTypes.DATE,
        amount: DataTypes.DECIMAL,
        type: DataTypes.STRING,
        category: DataTypes.STRING
    });

    Movimentation.associate = models => {
        Movimentation.belongsTo(models.Account, { as: 'account', foreignKey: 'account_id' });
        Movimentation.belongsTo(models.Company, { as: 'company', foreignKey: 'company_id' });
        Movimentation.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    }

    return Movimentation;
}