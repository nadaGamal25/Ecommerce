import slugify from "slugify"
import { Product } from "../../../database/models/product.model.js"
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

const addProduct=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    req.body.imgCover=req.files.imgCover[0].filename
    req.body.images=req.files.images.map(img=>img.filename)
    let product=new Product(req.body)
    await product.save()
    res.status(200).json({message:"success",product})
})

const updateProduct=catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug=slugify(req.body.title)
    if(req.files.imgCover) req.body.imgCover=req.files.imgCover[0].filename
    if(req.files.images) req.body.images=req.files.images.map(img=>img.filename)
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new AppError("product not found", 404));
      }

    if (req.files.imgCover && product.imgCover) {
        const oldImgCoverPath = path.join(__dirname, '../../../uploads/products', product.imgCover);
        deleteImageFile(oldImgCoverPath);
    }
    if (req.files.images && product.images.length > 0) {
        product.images.forEach(image => {
            const oldImagePath = path.join(__dirname, '../../../uploads/products', image);
            deleteImageFile(oldImagePath);
        });
    }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ message: "Success", product });
})

const deleteProduct = catchError(async (req, res, next) => {
    let document = await Product.findById(req.params.id);
    if (!document) {
        return next(new AppError("Document not found", 404));
    }

    // Remove the image file
    if (document.imgCover) {
        const imgCoverPath = path.join(__dirname, '../../../uploads/products', document.imgCover);
        deleteImageFile(imgCoverPath);
    }

    // Remove all other image files
    if (document.images && document.images.length > 0) {
        document.images.forEach(image => {
            const imagePath = path.join(__dirname, '../../../uploads/products', image);
            deleteImageFile(imagePath);
        });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Success" });
});


const allProducts=getAll(Product)

const getProduct=getOne(Product)


export{
    addProduct,allProducts,getProduct,updateProduct,deleteProduct
}