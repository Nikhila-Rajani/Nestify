import { IAdminRepository } from "../../interfaces/admin/IadminRepositoryInterface";
import { IAdminService } from "../../interfaces/admin/IadminServiceInterface";
import { IUserRepositoryInterface } from "../../interfaces/user/IuserRepositoryInterface";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";





class AdminService implements IAdminService {
    constructor(
        private _adminRepository: IAdminRepository,
        private _userRepository: IUserRepositoryInterface,

    ) { }

    async adminLogin(
        email: string,
        password: string
    ): Promise<{ admin: any; accessToken: string; refreshToken: string }> {
        const admin = await this._adminRepository.findByEmail(email);

        if (!admin) {
            throw new Error("Admin not found");
        }
        if (password !== admin.password) {
            throw new Error("Invalid email or password");
        }

        const accessToken = generateAccessToken({
            id: admin._id.toString(),
            role: "admin",
        });
        const refreshToken = generateRefreshToken({
            id: admin._id.toString(),
            role: "admin",
        });

        return { admin, accessToken, refreshToken };
    }

    async getAllUsers(
    page: number,
    limit: number,
    searchTerm: string,
    isBlocked: string
  ): Promise<{ users: any[]; total: number }> {
    const skip = (page - 1) * limit;
    // Build filter query
    const filter: any = {};
    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }
    if (isBlocked === "blocked") {
      filter.isBlocked = true;
    } else if (isBlocked === "active") {
      filter.isBlocked = false;
    }

    const [users , total] = await Promise.all([
      this._userRepository.findAll(filter , skip , limit),
      this._userRepository.countAll(filter)
    ])
    return {users , total}
  }

   async userBlock(userId: string, isBlocked: boolean): Promise<any> {
    try {
      const user = await this._userRepository.findById(userId);
      console.log("Before Update - isBlocked:", user?.isBlocked);
      if (!user) {
        throw new Error("User not found");
      }
      console.log('User is blocking boolean:', isBlocked);
      user.isBlocked = isBlocked;
      const updatedUser = await this._userRepository.save(user);
      console.log("After Update - isBlocked:", updatedUser?.isBlocked);
      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}

export default AdminService