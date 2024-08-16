import { Cart } from "../../../database/models/cart.model.js"
import {Coupon} from "../../../database/models/coupon.model.js"
import { Order } from "../../../database/models/order.model.js"
import {Product} from "../../../database/models/product.model.js"
import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PlTDERxvZKhUqen9YyDNkkPlTm82kW9edWjYo5VTQ6PizGEvzEENRC9RkRQ7aourKQxXoLZ7uma0rD54adtMVEY00bim6E52c');

const createCashOrder=catchError(async(req,res,next)=>{
    let cart=await Cart.findById(req.params.id)
    if(!cart) return next(new AppError("cart not found",404))

    let totalOrderPrice=cart.totalCartPriceAfterDiscount || cart.totalCartPrice    

    let order=new Order({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()

    let options=cart.cartItems.map((prod)=>{
        return {
            updateOne:{
                "filter":{_id:prod.product},
                "update":{$inc:{sold:prod.quantity,stock: -prod.quantity}}
            }
        }
    })
    await Product.bulkWrite(options)
    await Cart.findByIdAndDelete(cart._id)

    res.status(200).json({message:'success',order})

})

const getUserOrders=catchError(async(req,res,next)=>{
    let orders = await Order.findOne({user:req.user._id}).populate('orderItems.product')

    res.status(200).json({message:'success',orders})

})

const getAllOrders=catchError(async(req,res,next)=>{
    let orders = await Order.find({}).populate('orderItems.product')

    res.status(200).json({message:'success',orders})

})

const createCheckoutSession=catchError(async(req,res,next)=>{
    let cart=await Cart.findById(req.params.id)
    if(!cart) return next(new AppError("cart not found",404))

    let totalOrderPrice=cart.totalCartPriceAfterDiscount || cart.totalCartPrice    
    
    let session=await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount: totalOrderPrice*100,
                    product_data:{
                        name:req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:req.protocol+'://'+req.get('host')+'/orders/success',
        cancel_url:req.protocol+'://'+req.get('host')+'/orders/cancel',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress,
        

    })

    res.status(200).json({message:'success',session})

})

const createWebhookOrder=catchError(async(req,res,next)=>{
    const sig = request.headers['stripe-signature'].toString();
  
    let event = stripe.webhooks.constructEvent(request.body, sig, "whsec_Rl4mCuMeQVV0NYjAOGTIlp4nBUKixAQh");
   
    // Handle the event
    let checkout 
    if (event.type == 'checkout.session.completed') {
        checkout = event.data.object;
        let cart=await Cart.findById(checkout.client_reference_id)
        if(!cart) return next(new AppError("cart not found",404))
        
        let user =await User.findOne({email:checkout.customer_email})
        let order=new Order({
            user: user._id,
            orderItems:cart.cartItems,
            shippingAddress:checkout.metadata,
            totalOrderPrice:checkout.amount_total / 100,
            paymentType:'card',
            isPaid:true
        })
        await order.save()
    
        let options=cart.cartItems.map((prod)=>{
            return {
                updateOne:{
                    "filter":{_id:prod.product},
                    "update":{$inc:{sold:prod.quantity,stock: -prod.quantity}}
                }
            }
        })
        await Product.bulkWrite(options)
        await Cart.findByIdAndDelete(cart._id)
        }
  
    // Return a 200 response to acknowledge receipt of the event
    response.json({message:"success",checkoutSessionCompleted});
   

})


export{
    createCashOrder,getAllOrders,getUserOrders,createCheckoutSession,createWebhookOrder
}


//cQYRoE0MnssGattd
//testuser