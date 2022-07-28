'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.createTable('reivews', {    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Position: {
        type: Sequelize.STRING
      },
      Desc: {
        type: Sequelize.STRING
      },
      Type: {
        type: Sequelize.STRING
      },
      IDNv: {
        type: Sequelize.INTEGER
      },
      IDCreator: {
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
    await queryInterface.dropTable('reviews');
  }
};