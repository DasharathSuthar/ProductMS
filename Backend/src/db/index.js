import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/productMS`)
            .then(()=>{
                console.log("MonogDB Connected !!");
            })
    } catch (error) {
        console.log("MonogDB Connection Failed !",error);
        process.exit(1)        
    }
}

export default connectDB