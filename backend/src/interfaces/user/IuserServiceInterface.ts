import { IUser } from "../../models/user/userModel";
import { ForgotPasswordResponse } from "../../services/user/userService";
import { googleUserData } from "../../Types/types";

export interface IUserServiceInterface {
    authenticateUser(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }>
    registerUser(
        fullName: string,
        email: string,
        password: string,
        mobile_no: string
    ): Promise<IUser>
    googleSignIn(
        userData: googleUserData
    ): Promise<{ user: IUser; accessToken: string; refreshToken: string }>
    forgotPasswordVerify(email: string): Promise<ForgotPasswordResponse>
     resetPassword(
    email: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }>;
  

}

