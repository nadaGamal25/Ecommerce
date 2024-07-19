import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./product/product.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./user/user.routes.js"


export const bootstrap=(app)=>{
    app.use('/api/categories',categoryRouter)
    app.use('/api/sub-categories',subCategoryRouter)
    app.use('/api/brands',brandRouter)
    app.use('/api/products',productRouter)
    app.use('/api/user',userRouter)
}