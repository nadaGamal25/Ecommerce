import Joi from "joi";

const addSubCategoryVal=Joi.object({
    name:Joi.string().min(1).max(50).required(),
    category:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).required(),
})

const updateSubCategoryVal=Joi.object({
    name:Joi.string().min(1).max(50),
    category:Joi.string().hex().length(24),
    createdBy:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24),
})

const deleteSubCategoryVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getSubSubCategoryVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
    addSubCategoryVal,
    updateSubCategoryVal,
    deleteSubCategoryVal,
    getSubSubCategoryVal
}