import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (!(user.role === "admin")) {
        throw new ApiError(400, "Unauthorized request. Admin only")
    }

    const { name, price, des } = req.body

    if (!(name || price)) {
        throw new ApiError(400, "Name and Price are required.")
    }

    const existProduct = await Product.findOne({ name })

    if (existProduct) {
        throw new ApiError(409, "Product is already exist with same name.")
    }


    const productImgLocalPath = req.file?.path;

    const productImage = await uploadOnCloudinary(productImgLocalPath)

    if (!productImage) {
        throw new ApiError(400, "product image is missing")
    }

    const product = await Product.create({
        name: name.toLowerCase(),
        price,
        img: productImage.url || "",
        des
    })

    return res.status(200).json(new ApiResponse(200, product, "Product created."))
})

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    if (!products) {
        throw new ApiError(400, "something is wrong when facthing Products")
    }

    return res.status(200).json(new ApiResponse(200, products, "Prodcuts facthed successfully"))
})

const getProductById = asyncHandler(async (req, res) => {

    const productById = await Product.findById(req.params.id)

    if (!productById) {
        throw new ApiError(400, "product Id is invalid")
    }

    return res.status(200).json(new ApiResponse(200, productById, "Prodcuts  facthed successfully"))

})

const updateProductDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!(user.role === "admin")) {
        throw new ApiError(400, "Unauthorized request. Admin only")
    }

    const { name, price, des } = req.body

    if (!name || !price || !des) {
        throw new ApiError(400, "Name, Price, and Description are required.");
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: { name, price, des } }, { new: true })
    if (!updatedProduct) {
        throw new ApiError(404, "Product not found.");
    }

    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product details Updated successfully."))

})

const deleteProduct = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!(user.role === "admin")) {
        throw new ApiError(400, "Unauthorized request. Admin only")
    }

    await Product.findByIdAndDelete(req.params.id)

    return res.status(200).json(new ApiResponse(200, {}, "Product Deleted successfully."))
})
export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductDetails,
    deleteProduct
}