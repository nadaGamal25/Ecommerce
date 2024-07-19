import express from 'express'
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from './category.controller.js'
import { uploadSingleFile } from '../../fileUpload/fileUpload.js'
import { addCategoryVal, deleteCategoryVal, getCategoryVal, updateCategoryVal } from './category.validation.js'
import { validate } from '../../middleware/validate.js'
const categoryRouter=express.Router()

categoryRouter.route('/')
.post(uploadSingleFile('img','categories'),validate(addCategoryVal),addCategory)
.get(allCategories)

categoryRouter.route('/:id')
.get(validate(getCategoryVal),getCategory)
.put(uploadSingleFile('img','categories'),validate(updateCategoryVal),updateCategory)
.delete(validate(deleteCategoryVal),deleteCategory)

export default categoryRouter