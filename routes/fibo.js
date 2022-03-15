const FiboController = require('../controllers/fibo')

const router = require('express').Router()

router.post('/', FiboController.create)

module.exports = router
