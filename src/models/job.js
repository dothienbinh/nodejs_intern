'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Job.init({
    Name: DataTypes.STRING,
    Desc: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
    StatusDesc: DataTypes.STRING,
    IDNv: DataTypes.INTEGER,
    IDCreator: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};