import Joi from "joi";

const addProductVal=Joi.object({
    title: Joi.string().min(1).max(50).required(),
    desc: Joi.string().min(1).required(),
    imgCover: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required(),
    images: Joi.array().items(
        Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
            size: Joi.number().max(5242880).required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required()
        })
    ).min(1),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0),
    sold: Joi.number().min(0),
    stock: Joi.number().min(0),
    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    rateAvg: Joi.number().min(0).max(5),
    rateCount: Joi.number().min(0),
    createdBy: Joi.string().hex().length(24).required()
})

const updateProductVal=Joi.object({
    title: Joi.string().min(1).max(50),
    slug: Joi.string().min(1).max(50),
    desc: Joi.string().min(1),
    imgCover: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }),
    images: Joi.array().items(
        Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
            size: Joi.number().max(5242880).required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required()
        })
    ).min(0),
    price: Joi.number().min(0),
    priceAfterDiscount: Joi.number().min(0),
    sold: Joi.number().min(0),
    stock: Joi.number().min(0),
    category: Joi.string().hex().length(24),
    subCategory: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    rateAvg: Joi.number().min(0).max(5),
    rateCount: Joi.number().min(0),
    createdBy: Joi.string().hex().length(24),
    id:Joi.string().hex().length(24).required(),
})

const deleteProductVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

const getProductVal=Joi.object({
    id:Joi.string().hex().length(24).required(),
})

export{
    addProductVal,updateProductVal,deleteProductVal,getProductVal
}