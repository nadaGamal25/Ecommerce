import express from 'express'
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from './brand.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'
import { validate } from '../../middleware/validate.js'
import { addBrandVal, deleteBrandVal, getBrandVal, updateBrandVal } from './brand.validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const brandRouter=express.Router()

brandRouter.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),validate(addBrandVal),addBrand)
.get(protectedRoutes,allowedTo('user','admin'),allBrands)

brandRouter.route('/:id')
.get(protectedRoutes,allowedTo('user','admin'),validate(getBrandVal),getBrand)
.put(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),validate(updateBrandVal),updateBrand)
.delete(protectedRoutes,allowedTo('admin'),validate(deleteBrandVal),deleteBrand)

export default brandRouter