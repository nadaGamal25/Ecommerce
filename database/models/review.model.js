import mongoose, { Schema, model } from "mongoose"
import { Product } from "./product.model.js";

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
  

reviewSchema.post('save', async function() {
  await this.constructor.calcAverageRating(this.product);
});

reviewSchema.post('findOneAndDelete', async function() {
  await this.constructor.calcAverageRating(this.product);
});

reviewSchema.statics.calcAverageRating = async function(productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        rateCount: { $sum: 1 },
        rateAvg: { $avg: '$rate' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rateCount: stats[0].rateCount,
      rateAvg: stats[0].rateAvg
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rateCount: 0,
      rateAvg: 0
    });
  }
};

export const Review = model('Review', reviewSchema);