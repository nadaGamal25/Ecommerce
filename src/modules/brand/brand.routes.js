import express from 'express'
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from './brand.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'
import { validate } from '../../middleware/validate.js'
import { addBrandVal, deleteBrandVal, getBrandVal, updateBrandVal } from './brand.validation.js'

const brandRouter=express.Router()

brandRouter.route('/')
.post(uploadSingleFile('logo','brands'),validate(addBrandVal),addBrand)
.get(allBrands)

brandRouter.route('/:id')
.get(validate(getBrandVal),getBrand)
.put(uploadSingleFile('logo','brands'),validate(updateBrandVal),updateBrand)
.delete(validate(deleteBrandVal),deleteBrand)

export default brandRouter