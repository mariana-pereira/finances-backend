module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        name: DataTypes.STRING,
        amount: DataTypes.DECIMAL,
    });

    Item.associate = models => {
        Item.belongsTo(models.Expense, { as: 'expense', foreignKey: 'expense_id' });
    }

    return Item;
}