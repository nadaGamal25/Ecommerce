import mongoose, { Schema, model } from "mongoose"

const couponSchema = new Schema({
    code: {
      type: String,
      required: true,
      unique: true,
    }, 
    discount: {
      type: Number,
      required: true,
    },
    expires:{
        type: Date,
    }
 
  },{
    timestamps: true
  });
  

export const Coupon = model('Coupon', couponSchema);