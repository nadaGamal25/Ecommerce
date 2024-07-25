import slugify from "slugify"
import { Product } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"
import { deleteImageFile } from "../../utils/deleteOldImage.js"

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
        deleteImageFile(product.imgCover,'products');
    }
    if (req.files.images && product.images.length > 0) {
        product.images.forEach(image => {
            deleteImageFile(image,'products');
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
        deleteImageFile(document.imgCover,'products');
    }

    // Remove all other image files
    if (document.images && document.images.length > 0) {
        document.images.forEach(image => {
            deleteImageFile(image,'products');
        });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Success" });
});


const allProducts=catchError(async(req,res,next)=>{
    let document=await Product.find()
    res.status(200).json({message:"success",document})
})
// const allProducts=getAll(Product)
const getProduct=getOne(Product)


export{
    addProduct,allProducts,getProduct,updateProduct,deleteProduct
}