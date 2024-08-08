import mongoose, { Schema, model } from "mongoose"

const cartSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    cartItems:[{
        product:{ type:mongoose.Types.ObjectId,ref:'Product'},
        quantity:{type:Number,default:1},
        price:{type:Number},
    }],
    totalCartPrice:{type:Number,default:0},
    discount:Number,
    totalCartPriceAfterDiscount:Number,
 
  },{
    timestamps: true
  });
 

export const Cart = model('Cart', cartSchema);