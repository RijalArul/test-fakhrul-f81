const CombinateController = require('../controllers/combination')

const router = require('express').Router()

router.post('/', CombinateController.create)

module.exports = router
