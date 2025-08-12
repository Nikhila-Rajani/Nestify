import IOtpRepository from "../../interfaces/otp/otpRepositoryInterface";
import { IOtp, otpModel  } from "../../models/common/otpModel";


export class OtpRepository implements IOtpRepository {
    async storeOtp(otp: string, email: string): Promise<boolean> {
        try {
            await otpModel.deleteMany({ email })
            const newOtp = new otpModel({ email, otp })
            await newOtp.save()
            return true
        } catch (error: any) {
            console.log(error.message)
            return false
        }
    }

    async findOtp(email: string): Promise<IOtp | null> {
        try {
            return await otpModel.findOne({email}).sort({createdAt : -1})
        } catch (error:any) {
            console.log(error.message)
            return null
        }
    }
}