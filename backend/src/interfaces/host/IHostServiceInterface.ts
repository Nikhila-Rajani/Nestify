import { IHostRequest } from "../../models/host/hostModel";

export  interface IHostServiceInterface {
    requestHost(data: Partial<IHostRequest>): Promise<IHostRequest>
}