import { Request, Response, NextFunction } from 'express';
import { IUserServiceInterface } from '../interfaces/user/IuserServiceInterface';
import { AppError } from '../utils/AppError';
import { HttpStatus } from '../constants/HttpStatus';
import { MessageConstants } from '../constants/MessageConstants';
import { CookieManager } from '../utils/CookieManager';
import { sendError, sendResponse } from '../utils/responseUtilities';
import { googleUserData } from '../Types/types';
import admin from '../config/fireBase';

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
        sendError(res,HttpStatus.INTERNAL_SERVER_ERROR,MessageConstants.INTERNAL_SERVER_ERROR)
      
      }
    }

    async googleSignIn(req: Request, res: Response): Promise<void> {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        sendResponse(
          res,
          HttpStatus.BadRequest,
          MessageConstants.ID_TOKEN_REQUIRED
        );
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const userData: googleUserData = {
        uid: decodedToken.uid,
        email: decodedToken.email!,
        email_verified: decodedToken.email_verified!,
        name: decodedToken.name || "Unknown",
      };

      const { user, accessToken, refreshToken } =
        await this._userService.googleSignIn(userData);
      CookieManager.setAuthCookies(res, { accessToken, refreshToken });
      const responseData = {
        user: { id: user._id, name: user.fullName, email: user.email },
        accessToken,
        refreshToken,
      };
      sendResponse(
        res,
        HttpStatus.OK,
        MessageConstants.GOOGLE_SIGNIN_SUCCESS,
        responseData
      );
    } catch (error: any) {
      sendError(
        res,
        HttpStatus.InternalServerError,
        MessageConstants.GOOGLE_SIGNIN_FAILED
      );
    }
  }

  
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      console.log("forgetemail", email);
      if (!email) {
        res.status(400).json({ success: false, message: "Email is required" });
        return;
      }
      const response = await this._userService.forgotPasswordVerify(email);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(400).json(response);
      }
    } catch (error: any) {
      console.error("Error in forgotPassword controller:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

    async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body

      // Log the received request body
      console.log("Received request body:", req.body);

      if (!email || !password) {
        console.log("Missing email or newPassword in request body");
        res.status(400).json({
          success: false,
          message: "Email and new password are required",
        });
        return;
      }

      console.log(`Attempting to reset password for email: ${email}`);

      const response = await this._userService.resetPassword(email, password);

      // Log the response from the userService
      console.log("Response from userService.resetPassword:", response);

      if (response.success) {
        console.log(`Password successfully updated for email: ${email}`);
        res
          .status(200)
          .json({ success: true, message: "Password successfully updated" });
      } else {
        console.log(
          `Failed to update password for email: ${email}. Reason:`,
          response
        );
        res.status(400).json(response);
      }
    } catch (error: any) {
      console.error(
        "Error in resetPassword controller:",
        error.message,
        error.stack
      );
      sendError(
        res,
        HttpStatus.InternalServerError,
        MessageConstants.INTERNAL_SERVER_ERROR
      );
      // res
      //   .status(500)
      //   .json({ success: false, message: "Internal server error" });
    }
  }

    async logout (req:Request,res:Response) : Promise <void> {
      try {
        res.clearCookie("accessToken",{
          httpOnly:true,
          secure:false,
        });
        res.clearCookie("refreshToken",{
          httpOnly:true,
          secure :false
        });

        sendResponse(res,HttpStatus.OK,MessageConstants.SIGNOUT_SUCCESFUL)
      } catch (error:any) {
        console.error(error.message);
        sendError(res,HttpStatus.INTERNAL_SERVER_ERROR,MessageConstants.INTERNAL_SERVER_ERROR)
      
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