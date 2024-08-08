import Joi from "joi";

const addToWishListVal=Joi.object({
    product:Joi.string().hex().length(24).required(),
})

const removeFromWishListVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})


export{
    addToWishListVal,
    removeFromWishListVal
}