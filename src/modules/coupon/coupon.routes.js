import express from 'express'
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from './coupon.controller.js'

const couponRouter=express.Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter.route('/')
.post(addCoupon)
.get(allCoupons)

couponRouter.route('/:id')
.get(getCoupon)
.put(updateCoupon)
.delete(deleteCoupon)

export default couponRouter