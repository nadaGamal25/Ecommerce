import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"

const addUser=catchError(async(req,res,next)=>{
    let user=new User(req.body)
    await user.save()
    res.status(200).json({message:"success",user})
})

const updateUser=catchError(async(req,res,next)=>{
    let user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    user || next(new AppError("category not found",404))
    !user || res.status(200).json({message:"success",user})
})

const deleteUser=deleteOne(User)

const allusers=getAll(User)

const getUser=getOne(User)

export{
    addUser,updateUser,deleteUser,allusers,getUser
}