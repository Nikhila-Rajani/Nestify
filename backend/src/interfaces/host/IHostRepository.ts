import { IHostRequest } from "../../models/host/hostModel";

export interface IHostReporitory {
    create(data:Partial<IHostRequest>):Promise<IHostRequest>
    findByUserId(userId: string): Promise<IHostRequest | null>
}