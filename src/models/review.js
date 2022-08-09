'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'IDNv', as: 'Review_idNv_User'})
    }
  };
  Review.init({
    Name: DataTypes.STRING,
    Position: DataTypes.STRING,
    Desc: DataTypes.STRING,
    Type: DataTypes.STRING,
    IDNv: DataTypes.INTEGER,
    IDCreator: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Review',
    paranoid: true,
    timestamps: true,
    deletedAt: 'deletedAt',
  });
  return Review;
};