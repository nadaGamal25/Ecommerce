import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from './order.controller.js'
import { validate } from '../../middleware/validate.js'
import { createCashOrderVal } from './order.validation.js'

const orderRouter=express.Router()

orderRouter.route('/')
.get(protectedRoutes,allowedTo('admin'), getAllOrders)

orderRouter.get('/users',protectedRoutes,allowedTo('admin','user'), getUserOrders)

orderRouter.route('/:id')
.post(protectedRoutes,allowedTo('user'),validate(createCashOrderVal) ,createCashOrder)

orderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),createCheckoutSession)


export default orderRouter