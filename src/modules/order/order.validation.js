import Joi from 'joi';

const createCashOrderVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    shippingAddress: Joi.object({
        street: Joi.string().min(3).max(100).required(),
        city: Joi.string().min(2).max(50).required(),
        phone: Joi.string().required(),
        
    }).required()
});

export{
    createCashOrderVal
}