import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ApiError } from './utils/ApiError.js'
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import wishListRoute from "./routes/wishList.route.js"


app.use('/api/v1/users', userRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/wishLists', wishListRoute)

// // error handling
// app.all('*', (req, res, next) => {
//     next(new ApiError(404, `Route ${req.originalUrl} not found`))
// })

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        data: null
    })
})


export default app