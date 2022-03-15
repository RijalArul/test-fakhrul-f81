const Joi = require('joi')

const error_validate_combine = data => {
  const schema = Joi.object({
    n: Joi.number().required(),
    r: Joi.number().required()
  })

  return schema.validate(data)
}

module.exports.error_validate_combine = error_validate_combine
