import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deleteImageFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
        }
    });
};

const addCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.img=req.file.filename
    let category=new Category(req.body)
    await category.save()
    res.status(200).json({message:"success",category})
})

const updateCategory=catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug=slugify(req.body.name)
    if(req.file) req.body.img=req.file.filename
    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError("Category not found", 404));
      }
    if (req.file && category.img) {
    const oldImagePath = path.join(__dirname, '../../../uploads/categories', category.img);
    deleteImageFile(oldImagePath);
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ message: "Success", category });
})

const deleteCategory = catchError(async (req, res, next) => {
    let document = await Category.findById(req.params.id);
    if (!document) {
        return next(new AppError("Document not found", 404));
    }

    // Remove the image file
    if (document.img) {
        const imagePath = path.join(__dirname, '../../../uploads/categories', document.img);
        deleteImageFile(imagePath);
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Success" });
});



const allCategories=getAll(Category) 

const getCategory=getOne(Category)

export{
    addCategory,allCategories,getCategory,updateCategory,deleteCategory
}