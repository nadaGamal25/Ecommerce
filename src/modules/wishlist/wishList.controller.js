import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { User } from "../../../database/models/user.model.js"

const addToWishList=catchError(async(req,res,next)=>{
    let wishlist=await User.findByIdAndUpdate(req.user._id,
        {$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError("wishlist not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

const removeFromWishList=catchError(async(req,res,next)=>{
    let wishlist=await User.findByIdAndUpdate(req.user._id,
        {$pull:{wishlist:req.params.id}},{new:true})
    wishlist || next(new AppError("wishlist not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

const getLoggedUserWishList=async(req,res,next)=>{
    let wishlist=await User.findById(req.user._id).populate('wishlist')
    wishlist || next(new AppError("wishlist not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
    return res.json("hello")
}


export{
    addToWishList,
    removeFromWishList,
    getLoggedUserWishList
}