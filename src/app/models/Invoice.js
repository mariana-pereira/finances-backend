module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('Invoice', {
        name: DataTypes.STRING,
        month: DataTypes.STRING,
        year: DataTypes.STRING,
        expiry_date: DataTypes.DATE,
        invoice_amount: DataTypes.DECIMAL,
        paid: DataTypes.BOOLEAN,
    });

    Invoice.associate = models => {
        Invoice.belongsTo(models.Card, { as: 'card', foreignKey: 'card_id' });
        Invoice.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        //Invoice.hasMany(models.Expense, {foreignKey: 'invoice_id'});
    }

    return Invoice;
}