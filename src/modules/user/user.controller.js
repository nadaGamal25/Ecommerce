import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"

const addUser=catchError(async(req,res,next)=>{
    let user=new User(req.body)
    await user.save()
    res.status(200).json({message:"success",user})
})

export{
    addUser
}