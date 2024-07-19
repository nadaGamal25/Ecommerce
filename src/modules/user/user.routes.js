import express from 'express'
import { addUser } from './user.controller.js'

const userRouter=express.Router()

userRouter.route('/')
.post(addUser)



export default userRouter