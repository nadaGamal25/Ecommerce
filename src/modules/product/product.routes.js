import express from 'express'
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from './product.controller.js'
import { uploadMixFiles } from '../../fileUpload/fileUpload.js'
import { validate } from '../../middleware/validate.js'
import { addProductVal, deleteProductVal, getProductVal, updateProductVal } from './produt.validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const productRouter=express.Router()

productRouter.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadMixFiles([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}],'products'),validate(addProductVal),addProduct)
.get(protectedRoutes,allowedTo('user','admin'),allProducts)

productRouter.route('/:id')
.get(protectedRoutes,allowedTo('user','admin'),validate(getProductVal),getProduct)
.put(protectedRoutes,allowedTo('admin'),uploadMixFiles([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}],'products'),validate(updateProductVal),updateProduct)
.delete(protectedRoutes,allowedTo('admin'),validate(deleteProductVal),deleteProduct)

export default productRouter