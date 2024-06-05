import Joi from "joi";
export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().integer().min(6).max(20).required(),
    contactType: Joi.string().valid('personal', 'home').required(),
    gender: Joi.string().valid('male', 'female', 'other'),
    isFavourite: Joi.boolean(),

});
export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().message({'string.base': 'Username should be a string', 'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',}),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().integer().min(6).max(20).required(),
    contactType: Joi.string().valid('personal', 'home', 'work').required(),
    gender: Joi.string().valid('male', 'female', 'other'),
    isFavourite: Joi.boolean(),

});

// const validationResult = createContactSchema.validate(userData, {
//     abortEarly: false,
// });

