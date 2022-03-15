const { error_validate_fibo } = require('../middlewares/errorValidateFibo')

class FiboController {
  static async create (req, res) {
    try {
      const { error } = error_validate_fibo(req.body)
      const { n } = req.body
      if (error) {
        throw { name: 'Bad_Request', errors: error }
      } else {
        let a = 0
        let b = 1

        let c
        let result = []

        for (let i = 1; i <= +n; i++) {
          if (a <= +n) {
            result.push(a.toString())
          }
          c = a + b
          a = b
          b = c
        }

        res.status(200).json({
          data: result.join(' '),
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

module.exports = FiboController
