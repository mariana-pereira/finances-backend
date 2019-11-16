module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
      name: DataTypes.STRING,
    });
  
    Company.associate = models => {
        Company.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        //Company.hasMany(models.Movimentation, {foreignKey: 'company_id'});
      }
  
    return Company;
  }