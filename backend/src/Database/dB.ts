
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { log } from "console";

dotenv.config()
const url : string = process.env.MONGODB_URI || ""

export const connectDB = async() : Promise <void> => {
    try {
        await mongoose.connect (url);
        console.log("Connected to MongoDb")
        
    } catch (error) {
        console.error(error)
    }
}