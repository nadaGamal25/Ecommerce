import Joi from "joi";

const addAddressVal=Joi.object({
    city:Joi.string().required(),
    street:Joi.string().required(),
    phone:Joi.string().required(),
    
})

const removeAddressVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})


export{
    addAddressVal,
    removeAddressVal
}