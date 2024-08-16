process.on('uncaughtException',(err)=>{
    console.log('error in code',err)
})
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { globalError } from './src/middleware/globalError.js'
import dotenv from 'dotenv';
import { bootstrap } from './src/modules/bootstrap.js'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PlTDERxvZKhUqen9YyDNkkPlTm82kW9edWjYo5VTQ6PizGEvzEENRC9RkRQ7aourKQxXoLZ7uma0rD54adtMVEY00bim6E52c');

dotenv.config();
const port = process.env.PORT || 3000;
const app =express()

app.post('api/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'].toString();
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, "whsec_Rl4mCuMeQVV0NYjAOGTIlp4nBUKixAQh");
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Handle the event
    let checkoutSessionCompleted 
    switch (event.type) {
      case 'checkout.session.completed':
         checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.json({message:"success",checkoutSessionCompleted});
  });
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
//uSp3Ns.Ce.nkei.
//nno