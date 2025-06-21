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
    const userId = req.user._id;
    const userWishList = await WishList.findOne({ userId }).populate("userId").populate("items")

    if (!userWishList) {
        throw new ApiError(400, "WishList is Empty.")
    }

    return res.status(200).json(new ApiResponse(200, { List: userWishList }, "List facthed."))
})
const removeWishList = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const productId  = req.params.id;

    if (!userId || !productId) {
        throw new ApiError(400, "User ID and Product ID are required");
    }

    const userWishList = await WishList.findOne({ userId });

    if (!userWishList) {
        throw new ApiError(404, "Wishlist not found");
    }

    const itemIndex = userWishList.items.indexOf(productId);
    if (itemIndex === -1) {
        throw new ApiError(404, "Product not found in wishlist");
    }

    userWishList.items.splice(itemIndex, 1); 
    await userWishList.save();

    return res
        .status(200)
        .json(new ApiResponse(200, userWishList, "Product removed from wishlist"));
});


export {
    getWishList,
    removeWishList,
    addWishItem
}
