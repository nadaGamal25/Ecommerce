import mongoose, { Schema, model } from "mongoose"
import bcrypt from 'bcrypt'
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
    passwordChangedAt:Date,  
    wishlist:[{type:mongoose.Types.ObjectId,ref:'Product'}],
    addresses:[{
      city:String,
      street:String,
      phone:String,
    }]
  },{
    timestamps: true
  });

userSchema.pre('save',function(){
  this.password=bcrypt.hashSync(this.password,8)
})

userSchema.pre('findOneAndUpdate',function(){
  if (this._update.password)  this._update.password=bcrypt.hashSync(this._update.password,8)
})
  

export const User = model('User', userSchema);