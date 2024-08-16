import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"
import { Review } from "../../../database/models/review.model.js"

const addReview=catchError(async(req,res,next)=>{
    req.body.user=req.user._id
    let isExist=await Review.findOne({user:req.user._id, product:req.body.product})
    if(isExist) return next(new AppError("You have already reviewed this product",409))
    let review=new Review(req.body)
    await review.save()
    res.status(200).json({message:"success",review})
})

const updateReview=catchError(async(req,res,next)=>{
    req.body.user=req.user._id
    let review=await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    review || next(new AppError("review not found",404))
    !review || res.status(200).json({message:"success",review})
})

const deleteReview=deleteOne(Review)

const allReviews=getAll(Review)

const getReview=getOne(Review)


export{
    addReview,allReviews,getReview,updateReview,deleteReview
}