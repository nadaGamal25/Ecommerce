import Joi from "joi";

const addCategoryVal=Joi.object({
    name:Joi.string().min(1).max(50).required(),
    img:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required()
        }).required(),
    createdBy:Joi.string().hex().length(24).required(),
})

const updateCategoryVal=Joi.object({
    name:Joi.string().min(1).max(50),
    img:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required()
        }),
    createdBy:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24).required(),
})

const deleteCategoryVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getCategoryVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
    addCategoryVal,updateCategoryVal,deleteCategoryVal,getCategoryVal
}