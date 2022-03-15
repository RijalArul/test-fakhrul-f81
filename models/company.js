'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Company.hasMany(models.Employee, {
        foreignKey: 'company_id'
      })
    }
  }
  Company.init(
    {
      company_name: {
        type: DataTypes.STRING(50)
      },
      telephone_number: {
        type: DataTypes.STRING(50)
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      address: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Company'
    }
  )
  return Company
}
