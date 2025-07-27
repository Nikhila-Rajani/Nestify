import { IUser } from "../../models/userModel";

export interface IUserServiceInterface {
    authenticateUser(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }>
    registerUser(
        fullName: string,
        email: string,
        password: string,
        mobile_no: string
    ): Promise<IUser>
}   