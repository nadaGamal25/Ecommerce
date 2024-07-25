import mongoose, { Schema, model } from "mongoose"

const reviewSchema = new Schema({
    comment: {
      type: String,
    }, 
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    product:{
      type:mongoose.Types.ObjectId,
      ref:'Product',
      required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
 
  },{
    timestamps: true
  });




reviewSchema.pre(/^find/,function(){
  this.populate('user','name')
})  
  

export const Review = model('Review', reviewSchema);