const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password_reset_token: DataTypes.STRING,
    password_reset_expires: DataTypes.DATE,
  });

  User.beforeSave(async (User, optionsObject) => {
    const hash = await bcrypt.hash(User.password, 10);
    User.password = hash;
  });

  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }

  return User;
}