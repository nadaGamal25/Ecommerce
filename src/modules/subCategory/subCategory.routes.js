import express from 'express'
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from './subCategory.controller.js'
import { validate } from '../../middleware/validate.js'
import { addSubCategoryVal, deleteSubCategoryVal, getSubSubCategoryVal, updateSubCategoryVal } from './subCategory.validation.js'

const subCategoryRouter=express.Router()

subCategoryRouter.route('/')
.post(validate(addSubCategoryVal) ,addSubCategory)
.get(allSubCategories)

subCategoryRouter.route('/:id')
.get(validate(getSubSubCategoryVal),getSubCategory)
.put(validate(updateSubCategoryVal),updateSubCategory)
.delete(validate(deleteSubCategoryVal),deleteSubCategory)

export default subCategoryRouter