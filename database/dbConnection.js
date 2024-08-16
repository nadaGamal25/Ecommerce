import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

const dbUri = process.env.ATLAS_DB_URI;
// console.log(dbUri)
export const dbConnection= mongoose.connect(dbUri).then(()=>{
    console.log('connected to mongoDB')
})
.catch((err)=>{
    console.log(err)
    })
