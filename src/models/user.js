'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    MaNV: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    UserName: DataTypes.STRING,
    Password: DataTypes.STRING,
    Position: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Avatar: DataTypes.STRING,
    Gender: DataTypes.STRING,
    CMND: DataTypes.STRING,
    BHXH: DataTypes.STRING,
    Address: DataTypes.STRING,
    ManagerID: DataTypes.INTEGER,
    Role: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};