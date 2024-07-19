import express from 'express'
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from './product.controller.js'
import { uploadMixFiles } from '../../fileUpload/fileUpload.js'
import { validate } from '../../middleware/validate.js'
import { addProductVal, deleteProductVal, getProductVal, updateProductVal } from './produt.validation.js'

const productRouter=express.Router()

productRouter.route('/')
.post(uploadMixFiles([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}],'products'),validate(addProductVal),addProduct)
.get(allProducts)

productRouter.route('/:id')
.get(validate(getProductVal),getProduct)
.put(uploadMixFiles([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}],'products'),validate(updateProductVal),updateProduct)
.delete(validate(deleteProductVal),deleteProduct)

export default productRouter