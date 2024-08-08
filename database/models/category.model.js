import mongoose, { Schema, model } from "mongoose"

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
  
  categorySchema.post('find',function(doc){
  doc.img = `http://127.0.0.1:3000/uploads/categories/${doc.img}`;
})   

export const Category = model('Category', categorySchema);