import express from 'express'
import { validate } from '../../middleware/validate.js'
import { addReview, allReviews, deleteReview, getReview, updateReview } from './review.controller.js'
import { addReviewVal, deleteReviewVal, getReviewVal, updateReviewVal } from './review.validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const reviewRouter=express.Router()

reviewRouter.route('/')
.post(protectedRoutes,allowedTo('user'),validate(addReviewVal) ,addReview)
.get(allReviews)

reviewRouter.route('/:id')
.get(validate(getReviewVal),getReview)
.put(protectedRoutes,allowedTo('user'),validate(updateReviewVal),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),validate(deleteReviewVal),deleteReview)

export default reviewRouter