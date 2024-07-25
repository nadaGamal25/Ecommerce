import { AppError } from "../utils/appError.js";

export const validate=(schema)=>{
    return (req,res,next)=>{
        const dataToValidate = {
            ...req.body,
            ...req.params,
            ...req.query
        };
        // if (req.file) {
        //     dataToValidate.img = req.file;
        //     // dataToValidate.logo = req.file;
        // }
        if (req.file && req.file.fieldname === 'img') {
            dataToValidate.img = req.file;
        }
        if (req.file && req.file.fieldname === 'logo') {
            dataToValidate.logo = req.file;
        }

        if (req.files) {
            if (req.files.imgCover) {
                dataToValidate.imgCover = req.files.imgCover[0];
            }
            if (req.files.images) {
                dataToValidate.images = req.files.images;
            }
        }
        const {error}=schema.validate(dataToValidate,{abortEarly:false});
        if(!error){
            next()
        }else{
            let errMsgs=error.details.map(err=>err.message)
            next(new AppError(errMsgs,401))
        }
    }
}