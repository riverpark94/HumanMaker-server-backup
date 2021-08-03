'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Goals);
      this.hasMany(models.UsersHaveCharacters);
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    social: DataTypes.STRING,
    social_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};