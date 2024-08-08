import express from 'express'
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from './coupon.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { validate } from '../../middleware/validate.js'
import { addCouponVal, deleteCouponVal, getCouponVal, updateCouponVal } from './coupon.validation.js'

const couponRouter=express.Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter.route('/')
.post(validate(addCouponVal),addCoupon)
.get(allCoupons)

couponRouter.route('/:id')
.get(validate(getCouponVal),getCoupon)
.put(validate(updateCouponVal),updateCoupon)
.delete(validate(deleteCouponVal),deleteCoupon)

export default couponRouter