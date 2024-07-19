import { AppError } from "../utils/appError.js";

export const validate=(schema)=>{
    return (req,res,next)=>{
        const {error}=schema.validate({img:req.file,logo:req.file,
            imgCover: req.files.imgCover ? req.files.imgCover[0] : undefined,
            images: req.files.images,...req.body,...req.params,...req.query},{abortEarly:false});
        if(!error){
            next()
        }else{
            let errMsgs=error.details.map(err=>err.message)
            next(new AppError(errMsgs,401))
        }
    }
}