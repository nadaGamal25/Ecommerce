import Joi from "joi";

const addCouponVal=Joi.object({
    code:Joi.string().min(2).required(),
    discount:Joi.number().min(1).required(),
    expires:Joi.date().required(),
})

const getCouponVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const updateCouponVal=Joi.object({
    code:Joi.string().min(2),
    discount:Joi.number().min(1),
    expires:Joi.date(),
    id:Joi.string().hex().length(24).required(),
})

const deleteCouponVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
   addCouponVal,getCouponVal,updateCouponVal,deleteCouponVal
}