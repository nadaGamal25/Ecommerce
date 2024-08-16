import express from 'express'
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from './category.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'
import { addCategoryVal, deleteCategoryVal, getCategoryVal, updateCategoryVal } from './category.validation.js'
import { validate } from '../../middleware/validate.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const categoryRouter=express.Router()

categoryRouter.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadSingleFile('img','categories'),validate(addCategoryVal),addCategory)
.get(protectedRoutes,allowedTo('user','admin'),allCategories)

categoryRouter.route('/:id')
.get(protectedRoutes,allowedTo('user','admin'),validate(getCategoryVal),getCategory)
.put(protectedRoutes,allowedTo('admin'),uploadSingleFile('img','categories'),validate(updateCategoryVal),updateCategory)
.delete(/*protectedRoutes,allowedTo('admin')*/validate(deleteCategoryVal),deleteCategory)

export default categoryRouter