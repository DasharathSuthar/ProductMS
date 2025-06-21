import mongoose,{Schema} from 'mongoose'

const productSchema = new Schema({
    name : {
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    img:{
        type:String,
        required:true
    },
    des:{
        type:String,
    },
    status:{
        type:String,
        default:"Active"
    }
},{timestamps:true})

export const Product = mongoose.model("Product",productSchema)