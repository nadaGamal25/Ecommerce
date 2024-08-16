import Joi from "joi";

const addReviewVal=Joi.object({
    comment:Joi.string().min(1).max(500).required(),
    rate:Joi.number().min(1).max(5).required(),
    product:Joi.string().hex().length(24).required(),
    user:Joi.string().hex().length(24),
})

const updateReviewVal=Joi.object({
    comment:Joi.string().min(1).max(500),
    rate:Joi.number().min(1).max(5),
    product:Joi.string().hex().length(24),
    user:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24),
})

const deleteReviewVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getReviewVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
    addReviewVal,
    updateReviewVal,
    deleteReviewVal,
    getReviewVal
}