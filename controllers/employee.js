const { Employee } = require('../models')
class EmployeeController {
  static async delete (req, res) {
    try {
      const { id } = req.params

      const removeEmployee = await Employee.destroy({
        where: {
          id: id
        }
      })

      if (removeEmployee) {
        res.status(200).json({
          message: 'Success',
          status: true
        })
      } else {
        throw { name: 'Not_Found' }
      }
    } catch (err) {
      if (err.name === 'Not_Found') {
        res.status(404).json({
          message: 'Employee Not Found',
          status: false
        })
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
          status: false
        })
      }
    }
  }

  static async employee (req, res) {
    try {
      const { id } = req.params
      const employee = await Employee.findByPk(id)

      if (employee) {
        res.status(200).json({
          data: employee,
          status: true,
          message: 'Success'
        })
      } else {
        throw { name: 'Not_Found' }
      }
    } catch (err) {
      if (err.name === 'Not_Found') {
        res.status(404).json({
          message: 'Employee Not Found',
          status: false
        })
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
          status: false
        })
      }
    }
  }
}

module.exports = EmployeeController
