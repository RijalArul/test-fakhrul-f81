const {
  error_validate_combine
} = require('../middlewares/errorValidateCombine')

class CombinateController {
  static async create (req, res) {
    try {
      const { error } = error_validate_combine(req.body)
      const { n, r } = req.body
      if (error) {
        throw { name: 'Bad_Request', errors: error }
      } else {
        let result = 0
        let permutate1 = 1
        let permutate2 = 1
        let permutate3 = 1
        for (let i = 1; i <= n; i++) {
          permutate1 *= i
        }

        for (let i = 1; i <= r; i++) {
          permutate2 *= i
        }

        for (let i = 1; i <= n - r; i++) {
          permutate3 *= i
        }
        result = permutate1 / (permutate2 * permutate3)

        res.status(200).json({
          data: result,
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
}

module.exports = CombinateController
