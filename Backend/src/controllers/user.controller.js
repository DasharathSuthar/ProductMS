import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()

        return { accessToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong when generating tokens ")
    }
}

const options = {
    httpOnly: true,
    secure: true
}

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password, role } = req.body

    if ([userName, email, fullName, password, role].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.")
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User is already exists with same username or email.")
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering User")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Register successfully."))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is Required.")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User dose not exist.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect.")
    }

    const { accessToken } = await generateAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "user LoggedIn successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findById(req.user._id)

    return res
        .status(200)
        .clearCookie("accessToken",options)
        .json(new ApiResponse(200,{},"User Logged Out"))
})

const getCurrentUser = asyncHandler(async (req,res)=>{
     return res.status(200).json(new ApiResponse(200, req.user, "User fatched successfully."))
})

const changePassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body

    if (!(oldPassword || newPassword)) {
        throw new ApiError(400,"all filed are required")
    }

    const user = await User.findById(req.user._id)

    const isPasswordValid = user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) {
        throw new ApiError(400,"Old Password is incorrect")
    }

    user.password =  newPassword
    await user.save({validateBeforeSave:false})

    res.status(200).json(new ApiResponse(200,{},"Password Changed Successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changePassword
}