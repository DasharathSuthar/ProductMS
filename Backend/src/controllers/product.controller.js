import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (!(user.role === "admin")) {
        throw new ApiError(400, "Unauthorized request. Admin only")
    }

    const { name, price, img, des } = req.body

    if (!(name || price)) {
        throw new ApiError(400, "Name and Price are required.")
    }

    const existProduct = await Product.findOne({ name })

    if (existProduct) {
        throw new ApiError(409, "Product is already exist with same name.")
    }

    const product = await Product.create({
        name: name.toLowerCase(),
        price,
        img,
        des
    })

    res.status(200).json(new ApiResponse(200, product, "Product created."))
})

const getAllProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({})
    if (!products) {
        throw new ApiError(400,"something is wrong when facthing Products")
    }

    res.status(200).json(new ApiResponse(200,products,"Prodcuts facthed successfully"))
})
export {
    createProduct,
    getAllProducts
}