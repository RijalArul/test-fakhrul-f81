const CountryController = require('../controllers/countries')

const router = require('express').Router()

router.get('/', CountryController.all)

module.exports = router
