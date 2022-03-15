const CompanyController = require('../controllers/company')

const router = require('express').Router()

router.post('/', CompanyController.create)
router.get('/', CompanyController.all)
router.put('/:id/set_active', CompanyController.set_active)
router.post('/:company_id/employees', CompanyController.create_employee)
// router.get('/:id/employees'. CompanyController.)
router.get('/:id/employees', CompanyController.all_employee)
router.put(
  '/:company_id/employees/:employee_id',
  CompanyController.update_employee
)
module.exports = router
