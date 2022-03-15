'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      company_name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      telephone_number: {
        type: Sequelize.STRING(16)
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies')
  }
}
