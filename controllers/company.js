const {
  register_company_validate
} = require('../middlewares/errorRegisterCompany')
const {
  register_employee_validate
} = require('../middlewares/errorRegisterEmployee')
const {
  update_employee_validate
} = require('../middlewares/errorUpdateEmployee')
const { Company, Employee } = require('../models')
class CompanyController {
  static async create (req, res) {
    try {
      const { error } = register_company_validate(req.body)

      if (error) {
        throw { errors: error, name: 'Bad_Request' }
      } else {
        const company = await Company.create(req.body)

        res.status(201).json({
          id: company.id,
          status: true,
          message: 'Success'
        })
      }
    } catch (err) {
      if (err.name === 'Bad_Request') {
        res.status(400).json({
          status: false,
          message: err.errors.details[0].message
        })
      } else {
        res.status(500).json({
          status: false,
          message: 'Internal Server Error'
        })
      }
    }
  }

  static async all (req, res) {
    try {
      const companies = await Company.findAll()

      res.status(200).json({
        data: {
          count: companies.length,
          rows: companies
        },
        status: true,
        message: 'Success'
      })
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
        status: false
      })
    }
  }

  static async set_active (req, res) {
    try {
      const { id } = req.params
      const payload = {
        is_active: true
      }

      const findCompany = await Company.findByPk(id)

      if (findCompany) {
        await Company.update(payload, {
          where: {
            id: id
          },
          returning: true
        })

        res.status(200).json({
          data: {
            id: findCompany.id,
            is_active: findCompany.is_active
          },
          status: true,
          message: 'Success'
        })
      } else {
        throw { name: 'Not_Found' }
      }
    } catch (err) {
      if (err.name === 'Not_Found') {
        res.status(404).json({
          message: 'Companies Not Found',
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

  static async create_employee (req, res) {
    try {
      const { error } = register_employee_validate(req.body)
      const { company_id } = req.params
      const { name, email, phone_number, job_title } = req.body
      if (error) {
        throw { errors: error, name: 'Bad_Request' }
      } else {
        const employee = await Employee.create({
          name: name,
          email: email,
          phone_number: phone_number,
          job_title: job_title,
          company_id: company_id
        })
        res.status(201).json({
          message: 'Success',
          status: true,
          employee: employee
        })
      }
    } catch (err) {
      if (err.name === 'Bad_Request') {
        res.status(400).json({
          status: false,
          message: err.errors.details[0].message
        })
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          status: false,
          message: err.errors[0].message
        })
      } else if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({
          status: false,
          message: 'Job_title input must been manager, staff or director'
        })
      } else {
        res.status(500).json({
          status: false,
          message: 'Internal Server Error'
        })
      }
    }
  }

  static async update_employee (req, res) {
    try {
      const { company_id, employee_id } = req.params
      const { error } = update_employee_validate(req.body)
      if (error) {
        throw { errors: error, name: 'Bad_Request' }
      } else {
        const validCompany = await Company.findByPk(company_id)

        if (validCompany) {
          const validEmployee = await Employee.findByPk(employee_id)

          if (validEmployee) {
            await Employee.update(req.body, {
              where: {
                id: validEmployee.id
              },
              returning: true
            })

            res.status(200).json({
              id: validEmployee.id,
              company_id: validCompany.id,
              message: 'Success',
              status: true
            })
          } else {
            throw { name: 'Not_Found' }
          }
        } else {
          throw { name: 'Not_Found' }
        }
      }
    } catch (err) {
      if (err.name === 'Bad_Request') {
        res.status(400).json({
          status: false,
          message: err.errors.details[0].message
        })
      } else if (err.name === 'Not_Found') {
        res.status(404).json({
          message: 'Companies Or Employee Not Found',
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

  static async all_employee (req, res) {
    try {
      const { id } = req.params
      const employees = await Employee.findAll({
        where: {
          company_id: id
        }
      })
      res.status(200).json({
        data: {
          count: employees.length,
          rows: employees
        },
        status: true,
        message: 'Success'
      })
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
        status: false
      })
    }
  }
}

module.exports = CompanyController
