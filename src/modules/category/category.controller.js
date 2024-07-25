import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import {AppError} from "../../utils/appError.js"
import { deleteOne, getAll, getOne } from "../handler/handler.js"
import { deleteImageFile } from "../../utils/deleteOldImage.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const deleteImageFile = (filePath) => {
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.error(`Failed to delete file: ${filePath}`, err);
//         }
//     });
// };

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
    deleteImageFile(category.img,'categories');
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
        deleteImageFile(document.img,'categories');
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Success" });
});



const allCategories = catchError(async (req, res, next) => {
    try {
        let apiFeatures = new ApiFeatures(Category.find(), req.query);
        await apiFeatures.pagination();
        apiFeatures.filter().sort().search().fields();
        let document = await apiFeatures.mongooseQuery;
        // console.log(`Documents Retrieved: ${JSON.stringify(document)}`);
        res.status(200).json({
            message: "success",
            page: apiFeatures.currentPage,
            totalPages: apiFeatures.totalPages,
            total: apiFeatures.total,
            document
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});
// catchError(async (req, res, next) => {
//     let apiFeatures = new ApiFeatures(Category.find(), req.query);
//     await apiFeatures.pagination().filter().sort().search().fields();
//     let document = await apiFeatures.mongooseQuery;
//     console.log(`Documents Retrieved: ${JSON.stringify(document)}`);

//     res.status(200).json({
//         message: "success",
//         page: apiFeatures.currentPage,
//         totalPages: apiFeatures.totalPages,
//         total: apiFeatures.total,
//         document
//     });
// });

const getCategory=getOne(Category)

export{
    addCategory,allCategories,getCategory,updateCategory,deleteCategory
}