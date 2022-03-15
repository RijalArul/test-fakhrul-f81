const EmployeeController = require('../controllers/employee')

const router = require('express').Router()

router.delete('/:id', EmployeeController.delete)
router.get('/:id', EmployeeController.employee)
module.exports = router
