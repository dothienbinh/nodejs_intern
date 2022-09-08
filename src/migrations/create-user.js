'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {    
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaNV: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING,        
      },
      Email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        }
        
      },
      UserName: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Position: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Avatar: {
        type: Sequelize.STRING
      },      
      Gender: {
        type: Sequelize.STRING
      },
      CMND: {
        type: Sequelize.STRING
      },
      BHXH: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      ManagerID: {
        type: Sequelize.INTEGER
      },
      Role: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      RefreshToken: {
        type: Sequelize.STRING
      },
      deletedAt: {        
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};