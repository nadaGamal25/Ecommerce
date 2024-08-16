import mongoose, { Schema, model } from "mongoose"
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL

const categorySchema = new Schema({
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
    img: {
      type: String,
      required: true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
 
  },{
    timestamps: true
  });
  
  categorySchema.post('init',function(doc){
  doc.img = `${baseUrl}/uploads/categories/${doc.img}`;  
})   

export const Category = model('Category', categorySchema);