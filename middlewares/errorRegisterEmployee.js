const Joi = require('joi')

const register_employee_validate = data => {
  console.log(data)
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone_number: Joi.string()
      .min(8)
      .max(16)
      .required(),
    job_title: !data.job_title ? null : Joi.string().required()
  })

  return schema.validate(data)
}

module.exports.register_employee_validate = register_employee_validate
