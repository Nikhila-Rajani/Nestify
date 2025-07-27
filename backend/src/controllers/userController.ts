import { Request, Response, NextFunction } from 'express';
import { IUserServiceInterface } from '../interfaces/user/IuserServiceInterface';
import { AppError } from '../utils/AppError';
import { HttpStatus } from '../constants/HttpStatus';
import { MessageConstants } from '../constants/MessageConstants';
import { CookieManager } from '../utils/CookieManager';
import { sendResponse } from '../utils/responseUtilities';

  export class UserController{
    constructor(private _userService : IUserServiceInterface){

    }
    async login (req: Request, res: Response) : Promise <void> {
      const { email, password } = req.body;
      if(!email||!password){
        throw new AppError (HttpStatus.BadRequest,MessageConstants.REQUIRED_FIELDS_MISSING)
      }
      const {user,accessToken,refreshToken} = await this._userService.authenticateUser(email,password)
      CookieManager.setAuthCookies(res,{accessToken,refreshToken})
      sendResponse(res,HttpStatus.OK,MessageConstants.LOGIN_SUCCESS , {user: { email: user.email, role: user.role },accessToken,refreshToken})

    }

    async signup (req:Request,res:Response) : Promise <void> {
      try {
        const {fullName,email,password,mobile_no} = req.body
        const newUser = await this._userService.registerUser(
        fullName,
        email,
        password,
        mobile_no
        )
        sendResponse(res,HttpStatus.OK,MessageConstants.REGISTER_SUCCESFUL, { user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          mobile_no: newUser.mobile_no,
        }})
      
      } catch (error:any) {
        console.log(error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
      }
    }

  }

  

  // export const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     console.log("its verify otp");
  //     const { email, otp } = req.body;
  //     const user = await userRepository.findByEmail(email) as IUser | null;
  //     if (!user || user.otp !== otp) {
  //       return res.status(400).json({ message: 'Invalid OTP' });
  //     }
  //     await userRepository.update(email, { otp: null, isVerified: true });
  //     res.status(200).json({ message: 'OTP verified', token: 'temp-token', user: { email: user.email, role: user.role } });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const resendOTP = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { email } = req.body;
  //     const user = await userRepository.findByEmail(email) as IUser | null;
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //     const otp = generateOTP();
  //     console.log("resend otp isss",otp);
      
  //     await userRepository.update(email, { otp });
  //     res.status(200).json({ message: 'OTP resent', email });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { email } = req.body;
  //     const user = await userRepository.findByEmail(email) as IUser | null;
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //     const otp = generateOTP();
  //     console.log("forotpasss otp isss",otp);
  //     await userRepository.update(email, { otp });
  //     res.status(200).json({ message: 'OTP sent for password reset', email });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { email, otp, newPassword } = req.body;
  //     const user = await userRepository.findByEmail(email) as IUser | null;
  //     if (!user || user.otp !== otp) {
  //       return res.status(400).json({ message: 'Invalid OTP' });
  //     }
  //     await userRepository.update(email, { password: newPassword, otp: null });
  //     res.status(200).json({ message: 'Password reset successful', token: 'temp-token', email });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { token } = req.body;
  //     const email = `google-${Math.random().toString(36).substr(2, 9)}@example.com`;
  //     let user = await userRepository.findByEmail(email) as IUser | null;
  //     if (!user) {
  //       user = await userRepository.create({ email, password: 'google-auth', fullName: 'Google User', role: 'user', isVerified: true }) as IUser;
  //     }
  //     res.status(200).json({ message: 'Google login successful', token: 'temp-token', user: { email: user.email, role: user.role } });
  //   } catch (error) {
  //     next(error);
  //   }
  // };