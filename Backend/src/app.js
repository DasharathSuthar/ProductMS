import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"

app.use('/api/v1/users', userRoute)
app.use('/api/v1/products',productRoute)

export default app