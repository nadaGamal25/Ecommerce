import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/appError.js';
import dotenv from 'dotenv';

dotenv.config();

const fileUpload=(folderName)=>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {
            cb(null , uuidv4() +"-"+ file.originalname)
        }
    })

    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith('image/')){
            cb(null,true)
        }else{
            cb(new AppError('images only',401),false)
        }
 
    }

    const upload=multer({
        storage,fileFilter,limits:{
            fileSize: 1024*1024*5,
        }
    })
    return upload
}

export const uploadSingleFile= (fieldname,folderName)=> fileUpload(folderName).single(fieldname)
export const uploadMixFiles= (arrayOfFields,folderName)=> fileUpload(folderName).fields(arrayOfFields)