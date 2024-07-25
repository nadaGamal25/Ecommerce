import Joi from "joi";

const addUserVal=Joi.object({
    name:Joi.string().min(1).max(50).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9#@$]{8,20}$/).required(),
    repassword:Joi.string().valid(Joi.ref('password')),
   
})

const updateUserVal=Joi.object({
    name:Joi.string().min(1).max(50),
    role:Joi.string(),
    isBlocked:Joi.boolean(),
    confirmEmail:Joi.boolean(),
    email:Joi.string().email(),
})

const deleteUserVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getSubUserVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
    addUserVal,
    updateUserVal,
    deleteUserVal,
    getSubUserVal
}