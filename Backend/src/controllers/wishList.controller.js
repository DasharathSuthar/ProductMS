import { WishList } from "../models/wishlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addWishItem = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId } = req.body

    if (!userId || !productId) {
        throw new ApiError(400, "User ID and Product ID are required")
    }

    let userWishList = await WishList.findOne({ userId })

    if (userWishList) {
        const isAlreadyAdded = userWishList.items.includes(productId);

        if (isAlreadyAdded) {
            throw new ApiError(409, "Product is already in userWishList");
        }

        // Add new product
        userWishList.items.push(productId);
        await userWishList.save();
    } else {
        // Create new userWishList
        userWishList = await WishList.create({
            userId,
            items: [productId]
        });
    }
    return res.status(200).json(new ApiResponse(200, userWishList, "Product added to userWishList"));

})

const getWishList = asyncHandler(async (req, res) => {
    const allWishList = await WishList.find({}).populate("userId").populate("items")

    if (!allWishList) {
        throw new ApiError(400, "WishList is Empty.")
    }

    return res.status(200).json(new ApiResponse(200, { List: allWishList }, "List facthed."))
})

const removeWishList = asyncHandler(async (req, res) => {
    await WishList.findByIdAndDelete(req.params.id)
    return res.status(200).json(new ApiResponse(200, {}, "WishItem Removed."))
})

export {
    getWishList,
    removeWishList,
    addWishItem
}
