export interface IAdminService{
    adminLogin(
    email: string,
    password: string
  ): Promise<{ admin: any; accessToken: string; refreshToken: string }>;
   getAllUsers(
    page: number,
    limit: number,
    searchTerm: string,
    isBlocked: string
  ): Promise<{ users: any[]; total: number }>;
  userBlock(userId: string, isBlocked: boolean): Promise<any>

}