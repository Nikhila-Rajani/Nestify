import { IUser } from "../../models/user/userModel";

export interface IUserRepositoryInterface {
    findByEmail(email: string): Promise<IUser | null>
    create(userData: Partial<IUser>): Promise<IUser>;
    updatePassword(userId: string, hashedPassword: string): Promise<void>;
    findAll(filer: any, skip: number, limit: number): Promise<IUser[]>;
    countAll(filter: any): Promise<number>;
    findById(userId: string): Promise<IUser | null>;
    save(user:IUser):Promise<IUser>
}