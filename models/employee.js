'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Employee.belongsTo(models.Company, {
        foreignKey: 'company_id'
      })
    }
  }
  Employee.init(
    {
      name: {
        type: DataTypes.STRING(50)
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Email is already exists'
        }
      },
      phone_number: {
        type: DataTypes.STRING(16)
      },
      job_title: {
        type: DataTypes.ENUM('manager', 'director', 'staff'),
        defaultValue: 'staff'
      },
      company_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Employee'
    }
  )
  return Employee
}
