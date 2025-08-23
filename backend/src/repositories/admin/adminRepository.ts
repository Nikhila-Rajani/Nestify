import { IAdminRepository } from "../../interfaces/admin/IadminRepositoryInterface";
import adminModel, { IAdmin } from "../../models/admin/adminModel";



export class AdminRepository implements IAdminRepository {
    async findByEmail(email: string): Promise<IAdmin | any> {
        return await adminModel.findOne({email})
    }
}