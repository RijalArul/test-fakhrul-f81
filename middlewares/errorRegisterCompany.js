const Joi = require('joi')

const register_company_validate = data => {
  const schema = Joi.object({
    company_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    telephone_number: Joi.string()
      .min(8)
      .max(16)
      .required(),
    address: Joi.string()
      .min(10)
      .max(50)
      .required()
  })

  return schema.validate(data)
}

module.exports.register_company_validate = register_company_validate
