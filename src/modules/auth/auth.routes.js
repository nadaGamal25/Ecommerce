import express from 'express'
import { allowedTo, changePassword, deleteUser, getAccountData, protectedRoutes, signin, signup, updateAccount } from './auth.controller.js'
import { validate } from '../../middleware/validate.js'
import { changePasswordVal, signinVal, signupVal, updateUserVal } from './auth.validation.js'
import { checkEmailExist } from '../../middleware/checkEmailExist.js'

const authRouter=express.Router()

authRouter.post('/signup',validate(signupVal),checkEmailExist,signup)
authRouter.post('/signin',validate(signinVal),signin)
authRouter.put('/update-account',protectedRoutes,allowedTo('user') ,validate(updateUserVal),updateAccount)
authRouter.patch('/change-Password',protectedRoutes,allowedTo('user') ,validate(changePasswordVal),changePassword)
authRouter.delete('/delete-account',protectedRoutes,allowedTo('user'), deleteUser)
authRouter.get('/get-account',protectedRoutes,allowedTo('user') ,getAccountData)


export default authRouter