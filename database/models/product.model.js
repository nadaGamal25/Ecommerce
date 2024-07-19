import mongoose, { Schema, model } from "mongoose"

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
    },
    images:{
        type: [String],
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
    timestamps: true
  });
  

  productSchema.post('find',function(doc){
    doc.imgCover = `http://127.0.0.1:3000/uploads/products/${doc.imgCover}`;
    doc.images =doc.images.map(img=> `http://127.0.0.1:3000/uploads/products/`+img);

  
  })   

export const Product = model('Product', productSchema);