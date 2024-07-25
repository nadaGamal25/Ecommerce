import Joi from 'joi'


const signupVal=Joi.object({
    name:Joi.string().min(3).max(100).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9#@$]{8,20}$/).required(),
    repassword:Joi.string().valid(Joi.ref('password')),
})

const signinVal = Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9#@$]{8,20}$/).required()
})

const updateUserVal=Joi.object({
    name:Joi.string().min(3).max(100),
    email:Joi.string().email(),
})

const changePasswordVal=Joi.object({
    oldpassword:Joi.string().pattern(/^[A-Z][A-Za-z0-9#@$]{8,20}$/).required(),
    newpassword:Joi.string().pattern(/^[A-Z][A-Za-z0-9#@$]{8,20}$/).required(),
})

export{
    signupVal,signinVal,updateUserVal,changePasswordVal
}