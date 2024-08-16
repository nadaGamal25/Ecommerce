import mongoose, { Schema, model } from "mongoose"
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL

const brandSchema = new Schema({
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
    logo: {
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
  
  brandSchema.post('init',function(doc){
    doc.logo = `${baseUrl}/uploads/categories/${doc.logo}`;
  
  })   

export const Brand = model('Brand', brandSchema);