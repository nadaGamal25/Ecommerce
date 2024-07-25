import express from 'express'
import { addUser, allusers, deleteUser, getUser, updateUser } from './user.controller.js'
import { validate } from '../../middleware/validate.js'
import { addUserVal, deleteUserVal, getSubUserVal, updateUserVal } from './user.validation.js'
import { checkEmailExist } from '../../middleware/checkEmailExist.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const userRouter=express.Router()

userRouter.route('/')
.post(protectedRoutes,allowedTo('admin'),validate(addUserVal),checkEmailExist,addUser)
.get(protectedRoutes,allowedTo('admin'),allusers)

userRouter.route('/:id')
.get(protectedRoutes,allowedTo('admin'),validate(getSubUserVal),getUser)
.put(protectedRoutes,allowedTo('admin'),validate(updateUserVal),updateUser)
.delete(protectedRoutes,allowedTo('admin'),validate(deleteUserVal),deleteUser)


export default userRouter