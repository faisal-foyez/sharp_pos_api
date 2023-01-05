const Joi = require('@hapi/joi');

exports.userValidation = (data) =>{
    const schema = Joi.object({
        username:Joi.string().required(),
        password:Joi.string().required().min(6)
    })

    return schema.validate(data);

}
