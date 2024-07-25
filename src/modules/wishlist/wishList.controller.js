import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { User } from "../../../database/models/user.model.js"

const addToWishList=catchError(async(req,res,next)=>{
    let wishlist=await User.findByIdAndUpdate(req.user._id,
        {$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError("category not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

const removeFromWishList=catchError(async(req,res,next)=>{
    let wishlist=await User.findByIdAndDelete(req.user._id,
        {$pull:{wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError("category not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

const getLoggedUserWishList=catchError(async(req,res,next)=>{
    let wishlist=await User.findById(req.user._id).populate('wishlist')
    wishlist || next(new AppError("category not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

export{
    addToWishList,
    removeFromWishList,
    getLoggedUserWishList
}