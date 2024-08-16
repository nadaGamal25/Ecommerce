import dotenv from 'dotenv';
import mongoose, { Schema, model } from "mongoose";
dotenv.config();
const baseUrl = process.env.BASE_URL

const productSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    }, 
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    desc:{
        type: String,
        required: true
    },
    imgCover: {
      type: String,
      required: true
    },
    images:{
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required:true,
        min:0
    },
    priceAfterDiscount: {
        type: Number,
        required:true,
        min:0
    },
    sold:{
        type: Number,
    },
    stock:{
        type: Number,
    },
    category: {
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCategory: {
        type:mongoose.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    brand: {
        type:mongoose.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5,
    },
    rateCount:{
        type:Number,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }

 
  },{
    timestamps: true, toJSON:{virtuals:true}
  });
  
productSchema.virtual('myReviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product'
})  

productSchema.pre(/^find/,function(){
    this.populate('myReviews')
})

productSchema.post('init',function(doc){
    doc.imgCover = `${baseUrl}/uploads/products/${doc.imgCover}`;
    doc.images =doc.images.map(img=> `${baseUrl}/uploads/products/`+img);

  
  })   

export const Product = model('Product', productSchema);