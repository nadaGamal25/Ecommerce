import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"

const addSubCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subCategory=new SubCategory(req.body)
    await subCategory.save()
    res.status(200).json({message:"success",subCategory})
})

const updateSubCategory=catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug=slugify(req.body.name)
    let subCategory=await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subCategory || next(new AppError("category not found",404))
    !subCategory || res.status(200).json({message:"success",subCategory})
})

const deleteSubCategory=deleteOne(SubCategory)

const allSubCategories=getAll(SubCategory)

const getSubCategory=getOne(SubCategory)


export{
    addSubCategory,allSubCategories,getSubCategory,updateSubCategory,deleteSubCategory
}