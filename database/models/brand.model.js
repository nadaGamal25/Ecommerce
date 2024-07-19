import mongoose, { Schema, model } from "mongoose"

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
  
  brandSchema.post('find',function(doc){
    doc.logo = `http://127.0.0.1:3000/uploads/categories/${doc.logo}`;
  
  })   

export const Brand = model('Brand', brandSchema);