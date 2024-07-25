import express from 'express'
import { addToWishList, getLoggedUserWishList, removeFromWishList } from './wishList.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const wishlistRouter=express.Router()

wishlistRouter.route('/')
.patch(protectedRoutes,allowedTo('user') ,addToWishList)
.get(protectedRoutes,allowedTo('user') ,getLoggedUserWishList)

wishlistRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin') ,removeFromWishList)

export default wishlistRouter