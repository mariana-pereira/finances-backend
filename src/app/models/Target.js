module.exports = (sequelize, DataTypes) => {
    const Target = sequelize.define('Target', {
      name: DataTypes.STRING,
      necessary_amount: DataTypes.DECIMAL,
      actual_amount: DataTypes.DECIMAL,
      deadline: DataTypes.DATE,
    });
  
    Target.associate = models => {
        Target.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        //Target.hasMany(models.Investment, {foreignKey: 'target_id'});
      }
  
    return Target;
  }