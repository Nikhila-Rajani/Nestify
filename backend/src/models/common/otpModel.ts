import mongoose, { Schema,Document } from "mongoose"

export interface IOtp extends Document {
    email : string,
    otp   : string,
    createdAt : Date
}

const otpSchema = new Schema<IOtp> ({
    email : {type:String, required:true},
    otp   : {type:String, required:true},
    createdAt : {type:Date , default:Date.now}
},{timestamps:true})

export const otpModel = mongoose.model<IOtp>("otp", otpSchema);