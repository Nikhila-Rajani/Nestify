import { IUserRepositoryInterface } from "../../interfaces/user/IuserRepositoryInterface";
import { IUserServiceInterface } from "../../interfaces/user/IuserServiceInterface";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import { HttpStatus } from "../../constants/HttpStatus";
import { MessageConstants } from "../../constants/MessageConstants";
import { IUser } from "../../models/userModel";
import { Signup } from "../../interfaces/user/SignUpInterface";
import { googleUserData } from "../../Types/types";
import { generateOtp, hashOtp } from "../../utils/generateOtp";
import { sentMail } from "../../utils/sentMail";
import IOtpRepository from "../../interfaces/otp/otpRepositoryInterface";


export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    data: string | null;
}


export class UserService implements IUserServiceInterface {

    constructor(private _userRepo: IUserRepositoryInterface,
        private _otpRepo: IOtpRepository
    ) { }



    async authenticateUser(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        try {
            const user = await this._userRepo.findByEmail(email)
            if (!user) {
                throw new AppError(HttpStatus.NotFound, MessageConstants.USER_NOT_FOUND);
            }
            const isPassword = user.password ? await bcrypt.compare(password, user.password) : false
            if (!isPassword) {
                throw new AppError(HttpStatus.Unauthorized, MessageConstants.INVALID_PASSWORD);
            }
            const accessToken = generateAccessToken({ id: user._id.toString(), role: 'user', email: user.email })
            const refreshToken = generateRefreshToken({ id: user._id.toString(), role: 'user', email: user.email })
            return { user, accessToken, refreshToken }
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(HttpStatus.InternalServerError, MessageConstants.INTERNAL_SERVER_ERROR);
        }
    }


    async registerUser(
        fullName: string,
        email: string,
        password: string,
        mobile_no: string
    ): Promise<IUser> {
        const exstingUser = await this._userRepo.findByEmail(email)
        if (exstingUser) {
            console.log("Register: User already exists for email:", email);
            throw new Error("User with this email already exists.");
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData: Signup = {
            fullName,
            email,
            password: hashedPassword,
            mobile_no,
            is_verified: true,
            is_blocked: false,
        }
        return await this._userRepo.create(userData)
    }

    async googleSignIn(
        userData: googleUserData
    ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        const existingUser = await this._userRepo.findByEmail(userData.email);
        if (existingUser) {
            const accessToken = generateAccessToken({
                id: existingUser._id.toString(),
                role: "user",
                email: existingUser.email,
            });
            const refreshToken = generateRefreshToken({
                id: existingUser._id.toString(),
                role: "user",
            });
            return { user: existingUser, accessToken, refreshToken };
        }

        const newUser = await this._userRepo.create({
            email: userData.email,
            fullName: userData.name || "Unknown",
            mobile_no: "",
            google_id: userData.uid,
            isVerified: true,
            isBlocked: false,
        });
        const accessToken = generateAccessToken({
            id: newUser._id.toString(),
            role: "user",
            email: newUser.email,
        });
        const refreshToken = generateRefreshToken({
            id: newUser._id.toString(),
            role: "user",
        });
        return { user: newUser, accessToken, refreshToken };
    }

    async forgotPasswordVerify(email: string): Promise<ForgotPasswordResponse> {
        try {
            const userData = await this._userRepo.findByEmail(email);
            if (!userData) {
                return { success: false, message: "Mail not registered", data: null };
            }

            const otp = generateOtp();
            console.log("Generated otp:", otp);
            const mailSent = await sentMail(
                email,
                "Forgot Password Verification",
                `<p>Enter this code <b>${otp}</b> to verify your email for resetting the password.</p><p>This code expires in <b>2 Minutes</b></p>`
            );

            if (mailSent) {
                const hashedOtp = await hashOtp(otp);
                await this._otpRepo.storeOtp(hashedOtp, userData.email);
            }

            return {
                success: true,
                message: "Mail sent successfully",
                data: userData.email,
            };
        } catch (error) {
            console.error("Error in forgotPasswordVerify:", error);
            return { success: false, message: "Couldn’t verify mail", data: null };
        }
    }

    async resetPassword(
        email: string,
        newPassword: string
    ): Promise<{ success: boolean; message: string }> {
        const user = await this._userRepo.findByEmail(email);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        try {
            await this._userRepo.updatePassword(user._id.toString(), hashedPassword);
            return { success: true, message: "Password updated successfully" };
        } catch (error) {
            console.error(`Error updating password for email: ${email}`, error);
            return {
                success: false,
                message: "Error updating password. Please try again.",
            };
        }
    }
}


