import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from './cart.controller.js'
import { validate } from '../../middleware/validate.js'
import { addToCartVal, applyCouponVal, removeItemFromCartVal, updateQuantityVal } from './cart.validation.js'

const cartRouter=express.Router()

cartRouter.route('/')
.post(protectedRoutes,allowedTo('user'),validate(addToCartVal) ,addToCart)
.get(protectedRoutes,allowedTo('user') ,getLoggedUserCart)
.delete(protectedRoutes,allowedTo('user') ,clearUserCart)

cartRouter.route('/:id')
.put(protectedRoutes,allowedTo('user'),validate(updateQuantityVal) ,updateQuantity)
.delete(protectedRoutes,allowedTo('user') ,validate(removeItemFromCartVal),removeItemFromCart)

cartRouter.post('/apply-coupon/:id',protectedRoutes,allowedTo('user'),validate(applyCouponVal) ,applyCoupon)

export default cartRouter