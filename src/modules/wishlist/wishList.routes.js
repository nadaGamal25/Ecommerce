import express from 'express'
import { addToWishList, getLoggedUserWishList, removeFromWishList } from './wishList.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { validate } from '../../middleware/validate.js'
import { addToWishListVal, removeFromWishListVal } from './wishList.validation.js'

const wishlistRouter=express.Router()

wishlistRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),validate(addToWishListVal) ,addToWishList)
.get(protectedRoutes,allowedTo('user') ,getLoggedUserWishList)

wishlistRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validate(removeFromWishListVal) ,removeFromWishList)

export default wishlistRouter