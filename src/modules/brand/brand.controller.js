import slugify from "slugify"
import { Brand } from "../../../database/models/brand.model.js"
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

const addBrand=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
    let brand=new Brand(req.body)
    await brand.save()
    res.status(200).json({message:"success",brand})
})

const updateBrand=catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug=slugify(req.body.name)
    if(req.file) req.body.logo=req.file.filename
    let brand = await Brand.findById(req.params.id);

    if (!brand) {
        return next(new AppError("brand not found", 404));
      }
    if (req.file && brand.logo) {
    const oldImagePath = path.join(__dirname, '../../../uploads/brands', brand.logo);
    deleteImageFile(oldImagePath);
  }

  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ message: "Success", brand });
})

const deleteBrand = catchError(async (req, res, next) => {
    let document = await Brand.findById(req.params.id);
    if (!document) {
        return next(new AppError("Document not found", 404));
    }

    // Remove the image file
    if (document.logo) {
        const imagePath = path.join(__dirname, '../../../uploads/brands', document.logo);
        deleteImageFile(imagePath);
    }

    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Success" });
});


const allBrands=getAll(Brand)

const getBrand=getOne(Brand)


export{
    addBrand,allBrands,getBrand,updateBrand,deleteBrand
}