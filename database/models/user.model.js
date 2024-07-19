import { Schema, model } from "mongoose"

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum:['admin','user'],
      default: 'user',
      required: true,
    },
    isBlocked:{
      type: Boolean,
      required:true,
      default: false,
    },
    confirmEmail:{
        type: Boolean,
        required:true,
        default: false,
      },
  },{
    timestamps: true
  });
  

export const User = model('User', userSchema);