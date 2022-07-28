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
        type: Sequelize.STRING
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      UserName: {
        type: Sequelize.STRING
      },
      Password: {
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
        type: Sequelize.INTEGER
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};