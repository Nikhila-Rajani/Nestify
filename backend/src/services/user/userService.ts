import { IUserRepositoryInterface } from "../../interfaces/user/IuserRepositoryInterface";
import { IUserServiceInterface } from "../../interfaces/user/IuserServiceInterface";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import { HttpStatus } from "../../constants/HttpStatus";
import { MessageConstants } from "../../constants/MessageConstants";
import { IUser } from "../../models/userModel";
import { Signup } from "../../interfaces/SignUpInterface";

export class UserService implements IUserServiceInterface {

    constructor(private _userRepo: IUserRepositoryInterface) { }

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


}


