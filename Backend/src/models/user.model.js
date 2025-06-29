import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "userName is Required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is Required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: [true, "fullName is Required"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            userName: this.userName,
            role:this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)

