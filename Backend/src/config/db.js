import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Succesfully Connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }
}

export default connectDB;