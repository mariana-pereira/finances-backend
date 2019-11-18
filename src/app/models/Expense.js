module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        date: DataTypes.DATE,
        amount: DataTypes.DECIMAL,
        shop: DataTypes.STRING,
        category: DataTypes.STRING,
    });

    Expense.associate = models => {
        Expense.belongsTo(models.Invoice, { as: 'invoice', foreignKey: 'invoice_id' });
        Expense.belongsTo(models.Card, { as: 'card', foreignKey: 'card_id' });
        Expense.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    }

    return Expense;
}