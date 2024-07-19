import mongoose, { Schema, model } from "mongoose"

const subCategorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    }, 
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
 
  },{
    timestamps: true
  })
  

export const SubCategory = model('SubCategory', subCategorySchema);