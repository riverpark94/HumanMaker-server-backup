'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stickers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Goals);
    }
  };
  Stickers.init({
    sticker: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stickers',
  });
  return Stickers;
};