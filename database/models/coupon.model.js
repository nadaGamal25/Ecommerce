import mongoose, { Schema, model } from "mongoose"

const couponSchema = new Schema({
    code: {
      type: Number,
      required: true,
      unique: true,
    }, 
    discount: {
      type: Number,
      required: true,
    },
    expires:{
        type: Date,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
 
  },{
    timestamps: true
  });
  

export const Coupon = model('Coupon', couponSchema);