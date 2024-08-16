process.on('uncaughtException',(err)=>{
    console.log('error in code',err)
})
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { globalError } from './src/middleware/globalError.js'
import dotenv from 'dotenv';
import { bootstrap } from './src/modules/bootstrap.js'
import cors from 'cors'
import { createWebhookOrder } from './src/modules/order/order.controller.js'

dotenv.config();
const port = process.env.PORT || 3000;
const app =express()

app.post('api/webhook', express.raw({type: 'application/json'}),createWebhookOrder);
app.use(cors())
app.use(express.json())

app.use('/uploads',express.static('uploads'))

bootstrap(app)


app.use('*',(req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`,404))
})    

app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log('error outside express',err)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//jArk710EwtuNQHu4
//uSp3Ns.Ce.nkei.    nada
