import slugify from "slugify"
import { Product } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"
import { deleteImageFile } from "../../utils/deleteOldImage.js"
import { Review } from "../../../database/models/review.model.js"
import { User } from "../../../database/models/user.model.js"
import { uploadToCloudinary } from "../../fileUpload/fileUpload.js";

const addProduct=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    // req.body.imgCover=req.files.imgCover[0].filename
    // req.body.images=req.files.images.map(img=>img.filename)
    if (req.files && req.files.images) {
        req.body.images = [];
        
        for (let img of req.files.images) {
            try {
                const cloudinaryResult = await uploadToCloudinary(img.buffer, 'products', img.originalname);
                req.body.images.push(cloudinaryResult.secure_url);
            } catch (error) {
                console.error('Error uploading to Cloudinary', error);
                return next(new AppError('خطأ فى تحميل الصور', 400));
            }
        }
    }
  
    if (req.files && req.files.imgCover && req.files.imgCover[0]) {
        try {
            const cloudinaryResult = await uploadToCloudinary(req.files.imgCover[0].buffer, 'products', req.files.imgCover[0].originalname);
            req.body.imgCover = cloudinaryResult.secure_url; // Ensure this line sets a string in `req.body.imgCover`
        } catch (error) {
            return next(new AppError('خطأ فى تحميل الصورة', 400));
        }
    }
    let product=new Product(req.body)
    await product.save()
    res.status(200).json({message:"success",product})
})

const updateProduct=catchError(async(req,res,next)=>{
    // if(req.body.slug) req.body.slug=slugify(req.body.title)
    // if(req.files.imgCover) req.body.imgCover=req.files.imgCover[0].filename
    if (req.files && req.files.images) {
        req.body.images = [];
        
        for (let img of req.files.images) {
            try {
                const cloudinaryResult = await uploadToCloudinary(img.buffer, 'products', img.originalname);
                req.body.images.push(cloudinaryResult.secure_url);
            } catch (error) {
                console.error('Error uploading to Cloudinary', error);
                return next(new AppError('خطأ فى تحميل الصور', 400));
            }
        }
    }
  
    if (req.files && req.files.imgCover && req.files.profileImg[0]) {
        try {
            const cloudinaryResult = await uploadToCloudinary(req.files.profileImg[0].buffer, 'products', req.files.profileImg[0].originalname);
            req.body.profileImg = cloudinaryResult.secure_url; // Ensure this line sets a string in `req.body.profileImg`
        } catch (error) {
            return next(new AppError('خطأ فى تحميل الصورة', 400));
        }
    }
    if(req.files.images) req.body.images=req.files.images.map(img=>img.filename)
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new AppError("product not found", 404));
      }

    if (req.files.imgCover && product.imgCover) {
        let filename = product.imgCover.split("products/")[1]
        deleteImageFile(filename,'products');
    }
    if (req.files.images && product.images.length > 0) {
        product.images.forEach(image => {
            deleteImageFile(image.split("products/")[1],'products');
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
        let filename = document.imgCover.split("products/")[1]
        deleteImageFile(filename,'products');
    }

    // Remove all other image files
    if (document.images && document.images.length > 0) {
        document.images.forEach(image => {
            deleteImageFile(image.split("products/")[1],'products');
        });
    }

    await Product.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ product: req.params.id });
    await User.findOneAndUpdate({wishlist:req.params.id},
        {$pull:{wishlist:req.params.id}},{new:true}
    )

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