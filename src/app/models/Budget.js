module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
        name: DataTypes.STRING,
        amount: DataTypes.DECIMAL,
        month: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
    });

    Budget.associate = models => {
        Budget.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    }

    return Budget;
}