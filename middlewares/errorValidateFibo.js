const Joi = require('joi')

const error_validate_fibo = data => {
  const schema = Joi.object({
    n: Joi.number().required()
  })

  return schema.validate(data)
}

module.exports.error_validate_fibo = error_validate_fibo
