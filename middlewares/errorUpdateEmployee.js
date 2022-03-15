const Joi = require('joi')

const update_employee_validate = data => {
  const schema = Joi.object({
    name: !data.name
      ? null
      : Joi.string()
          .min(3)
          .max(50),
    email: !data.email
      ? null
      : Joi.string()
          .min(5)
          .max(255)
          .email(),
    phone_number: !data.phone_number
      ? null
      : Joi.string()
          .min(8)
          .max(16)
          .required(),
    job_title: !data.job_title ? null : Joi.string().required()
  })

  return schema.validate(data)
}

module.exports.update_employee_validate = update_employee_validate
