import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/appError.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileUpload = (folderName) => {
    // Use memory storage for serverless environments
    const storage = multer.memoryStorage();

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new AppError('Images only', 401), false);
        }
    }

    const upload = multer({
        storage,
        // fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5, // 5 MB limit
        }
    });
    return upload;
};

export const uploadMixFiles = (arrayOfFields, folderName) => fileUpload(folderName).fields(arrayOfFields);
export const uploadSingleFile = (fieldname, folderName) => fileUpload(folderName).single(fieldname);

// Helper function to upload file buffer to Cloudinary
export const uploadToCloudinary = async (fileBuffer, folderName, originalname) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: folderName, public_id: uuidv4() + '-' + originalname, format: 'png' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload failed:', error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer);
    });
};


// const fileUpload=(folderName)=>{
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, `uploads/${folderName}`)
//         },
//         filename: (req, file, cb) => {
//             cb(null , uuidv4() +"-"+ file.originalname)
//         }
//     })

//     function fileFilter(req,file,cb){
//         if(file.mimetype.startsWith('image/')){
//             cb(null,true)
//         }else{
//             cb(new AppError('images only',401),false)
//         }
 
//     }

//     const upload=multer({
//         storage,fileFilter,limits:{
//             fileSize: 1024*1024*5,
//         }
//     })
//     return upload
// }

// export const uploadSingleFile= (fieldname,folderName)=> fileUpload(folderName).single(fieldname)
// export const uploadMixFiles= (arrayOfFields,folderName)=> fileUpload(folderName).fields(arrayOfFields)