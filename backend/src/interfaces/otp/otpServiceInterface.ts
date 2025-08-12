interface IOtpService {
    sentOtp (email:string):Promise<boolean>
    verifyOtp (email:string , Otp:string) : Promise<boolean>
    resentOtp (email:string):Promise<boolean>

}
