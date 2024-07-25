import { catchError } from "../../middleware/catchError.js"
import { Coupon } from "../../../database/models/coupon.model.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"

const addCoupon=catchError(async(req,res,next)=>{
    let isExist= await Coupon.findOne({code:req.body.code})
    let coupon=new Coupon(req.body)
    await coupon.save()
    res.status(200).json({message:"success",coupon})
})

const updateCoupon=catchError(async(req,res,next)=>{
    let coupon=await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon || next(new AppError("coupon not found",404))
    !coupon || res.status(200).json({message:"success",coupon})
})

const deleteCoupon=deleteOne(Coupon)

const allCoupons=getAll(Coupon)

const getCoupon=getOne(Coupon)


export{
    addCoupon,allCoupons,getCoupon,updateCoupon,deleteCoupon
}