"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const AppError_1 = require("../utils/AppError");
const HttpStatus_1 = require("../constants/HttpStatus");
const MessageConstants_1 = require("../constants/MessageConstants");
const CookieManager_1 = require("../utils/CookieManager");
const responseUtilities_1 = require("../utils/responseUtilities");
class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new AppError_1.AppError(HttpStatus_1.HttpStatus.BadRequest, MessageConstants_1.MessageConstants.REQUIRED_FIELDS_MISSING);
            }
            const { user, accessToken, refreshToken } = yield this._userService.authenticateUser(email, password);
            CookieManager_1.CookieManager.setAuthCookies(res, { accessToken, refreshToken });
            (0, responseUtilities_1.sendResponse)(res, HttpStatus_1.HttpStatus.OK, MessageConstants_1.MessageConstants.LOGIN_SUCCESS, { user: { email: user.email, role: user.role }, accessToken, refreshToken });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullName, email, password, mobile_no } = req.body;
                const newUser = yield this._userService.registerUser(fullName, email, password, mobile_no);
                (0, responseUtilities_1.sendResponse)(res, HttpStatus_1.HttpStatus.OK, MessageConstants_1.MessageConstants.REGISTER_SUCCESFUL, { user: {
                        id: newUser._id,
                        fullName: newUser.fullName,
                        email: newUser.email,
                        mobile_no: newUser.mobile_no,
                    } });
            }
            catch (error) {
                console.log(error.message);
                res
                    .status(500)
                    .json({ message: "Internal Server Error", error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
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
