import express from 'express'
import { changePassword, deleteUser, getAccountData, signin, signup, updateUser } from './auth.controller.js'
import { validate } from '../../middleware/validate.js'
import { changePasswordVal, signinVal, signupVal, updateUserVal } from './auth.validation.js'

const authRouter=express.Router()

authRouter.post('/signup',validate(signupVal),signup)
authRouter.post('/signin',validate(signinVal),signin)
authRouter.put('/update-account',validate(updateUserVal),updateUser)
authRouter.patch('/change-Password',validate(changePasswordVal),changePassword)
authRouter.delete('/delete-account',deleteUser)
authRouter.get('/get-account',getAccountData)


export default authRouter