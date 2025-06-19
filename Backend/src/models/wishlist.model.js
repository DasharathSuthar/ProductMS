import mongoose, { Schema } from 'mongoose'


const wishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        type:Schema.Types.ObjectId,
        ref:"Product"
    }]
}, { timestamps: true })

export const WishList = mongoose.model("WishList", wishListSchema)