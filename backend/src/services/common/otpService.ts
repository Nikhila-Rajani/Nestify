import IOtpRepository from "../../interfaces/otp/otpRepositoryInterface";
import { compareOtps, generateOtp, hashOtp } from "../../utils/generateOtp";
import { sentMail } from "../../utils/sentMail";




export class OtpService implements IOtpService {
 
  constructor( private _otpRepository:IOtpRepository) {
                     
  }

  async sentOtp(email: string): Promise<boolean> {
    const otp = generateOtp(); // Generate a new OTP
    const hashedOtp = await hashOtp(otp);
    const stored = await this._otpRepository.storeOtp(hashedOtp, email);

    if (!stored) throw new Error('Error storing OTP.');
    console.log('Generated OTP:', otp);

    // Send OTP via email
    const mailSent = await sentMail(
      email,
      'OTP Verification',
     ` <p>Your OTP is: <strong>${otp}</strong></p>`,
    );

    if (!mailSent) throw new Error('Error sending OTP.');
    return true;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this._otpRepository.findOtp(email);
    if (!storedOtp)
      throw new Error(
        'No valid OTP found for this email. It may have expired.',
      );

    const isValid = await compareOtps(otp, storedOtp.otp);
    if (!isValid) throw new Error('Invalid OTP.');
    return true;
  }

  async resentOtp(email: string): Promise<boolean> {
    return await this.sentOtp(email);
  }
}