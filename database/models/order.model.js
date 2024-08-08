import mongoose, { Schema, model } from "mongoose"

const orderSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderItems:[{
        product:{ type:mongoose.Types.ObjectId,ref:'Product'},
        quantity:{type:Number,default:1},
        price:{type:Number},
    }],
    totalOrderPrice:{type:Number,default:0},
    shippingAddress:{
        city:String,
        street:String,
        phone:String,
    },
    paymentType:{
        type:String,
        enum:['cash','card'],
        default:'cash',
        required:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date
 
  },{
    timestamps: true
  });
 

export const Order = model('Order', orderSchema);