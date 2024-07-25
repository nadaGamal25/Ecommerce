import { User } from "../../../database/models/user.model.js"
import jwt from 'jsonwebtoken'
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;

//Sign Up
const signup=catchError(async(req,res)=>{
    let user =new User(req.body)
    await user.save()
    let token = jwt.sign({id:user._id, role:user.role},secretKey)
    res.status(201).json({message:'success',user,token})
})

//sign in
const signin=catchError(async(req,res,next)=>{
    let user = await User.findOne({email: req.body.email})
    if(!user || !bcrypt.compareSync(req.body.password,user.password))
        return next(new AppError('Invalid email or password',400))
    jwt.sign({userId:user._id,role:user.role},secretKey,async(err,token)=>{
        if(err)return next(new AppError('Something went wrong',500))
            res.status(200).json({message:'Login successful',token:token})
    })
    
})

//change password
const changePassword=catchError(async(req,res,next)=>{
    let user = await User.findById(req.user._id)
    if(user && bcrypt.compareSync(req.body.oldPassword,user.password)){
        let token = jwt.sign({userId:user._id, role:user.role},secretKey)
        await User.findByIdAndUpdate(req.user._id, {password:req.body.newPassword,passwordChangedAt:Date.now()}, { new: true })
        res.status(200).json({message:'Password changed successfully',token:token})
    }
    next(new AppError('Invalid password',400))
})

//protectedRoutes
const protectedRoutes=catchError(async(req,res,next)=>{
   let {token}=req.headers
   let userPayload =null
   if(!token) return next(new AppError('token not provided',401))
    jwt.verify(token,secretKey,(err,payload)=>{
        if(err)return next(new AppError('Invalid token',401))
            userPayload=payload

    })
    let user=await User.findById(userPayload.userId)
    if(!user) return next(new AppError('User not found',404))

    if(user.passwordChangedAt){
        let time=parseInt(user.passwordChangedAt.getTime() /1000)
        if(time>userPayload.iat) return next(new AppError('invalid tokin ..login again',401))
    }    
    req.user =user
    next()

})

//allowed to
const allowedTo=(...roles)=>{
    return catchError(async(req,res,next)=>{
        if(roles.includes((req.user.role)))
            return next()
        return next(new AppError('You are not authorized to access this route',403))
    })
} 



//update account.
const updateUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.user.userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
   
    user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });

    res.status(200).json({ message: 'Success', user });
});

//delete account.
const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndDelete(req.user.userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({ message: 'Success'});
});

//Get user account data 
const getAccountData=catchError(async(req,res)=>{
    let user = await User.findById(req.user.userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({message:'success',user})   
})

export{
    signup,signin,updateUser,deleteUser,getAccountData,changePassword,protectedRoutes,allowedTo
}