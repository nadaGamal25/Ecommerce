import express from 'express'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addAddress, getLoggedUserAddress, removeAddress } from './address.controller.js'
import { validate } from '../../middleware/validate.js'
import { addAddressVal, removeAddressVal } from './address.validation.js'

const addressRouter=express.Router()

addressRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),validate(addAddressVal) ,addAddress)
.get(protectedRoutes,allowedTo('user') ,getLoggedUserAddress)

addressRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),validate(removeAddressVal) ,removeAddress)

export default addressRouter