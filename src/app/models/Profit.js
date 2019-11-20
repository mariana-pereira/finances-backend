module.exports = (sequelize, DataTypes) => {
    const Profit = sequelize.define('Profit', {
        date: DataTypes.DATE,
        amount: DataTypes.DECIMAL,
    });

    Profit.associate = models => {
        Profit.belongsTo(models.Investment, { as: 'investment', foreignKey: 'investment_id' });
    }

    return Profit;
}