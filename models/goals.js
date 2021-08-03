'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users);
      this.hasMany(models.Stickers);
    }
  };
  Goals.init({
    goal: DataTypes.STRING,
    subgoal1: DataTypes.STRING,
    subgoal2: DataTypes.STRING,
    subgoal3: DataTypes.STRING,
    progress: DataTypes.INTEGER,
    achievement: DataTypes.INTEGER,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Goals',
  });
  return Goals;
};