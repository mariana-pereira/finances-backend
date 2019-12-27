module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      total_limit: DataTypes.DECIMAL,
      available_limit: DataTypes.DECIMAL,
      expiry_date: DataTypes.DATE,
    });

    Card.beforeSave(async (Card, optionsObject) => {
      const card = Card.number.replace(/(?<=\d{4})\d(?=\d{4})/g, 'x');
      Card.number = card;
    });
  
    Card.associate = models => {
        Card.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        //Card.hasMany(models.Invoice, {foreignKey: 'card_id'});
      }
  
    return Card;
  }