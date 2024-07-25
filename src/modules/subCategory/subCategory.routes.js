import express from 'express'
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from './subCategory.controller.js'
import { validate } from '../../middleware/validate.js'
import { addSubCategoryVal, deleteSubCategoryVal, getSubSubCategoryVal, updateSubCategoryVal } from './subCategory.validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const subCategoryRouter=express.Router()

subCategoryRouter.route('/')
.post(protectedRoutes,allowedTo('admin'),validate(addSubCategoryVal) ,addSubCategory)
.get(protectedRoutes,allowedTo('user','admin'),allSubCategories)

subCategoryRouter.route('/:id')
.get(protectedRoutes,allowedTo('user','admin'),validate(getSubSubCategoryVal),getSubCategory)
.put(protectedRoutes,allowedTo('admin'),validate(updateSubCategoryVal),updateSubCategory)
.delete(protectedRoutes,allowedTo('admin'),validate(deleteSubCategoryVal),deleteSubCategory)

export default subCategoryRouter