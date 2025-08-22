import { IUser } from "../../models/userModel";

export interface IUserRepositoryInterface {
    findByEmail(email: string) : Promise <IUser|null>
    create(userData: Partial<IUser>): Promise<IUser>;
    updatePassword(userId: string, hashedPassword: string): Promise<void>;
}