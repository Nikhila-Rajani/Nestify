import { IHostReporitory } from "../../interfaces/host/IHostRepository";
import { HostRequest, IHostRequest } from "../../models/host/hostModel";
import { BaseRepository } from "../common/BaseRepository";

export class hostRepository extends BaseRepository <IHostRequest> implements IHostReporitory {
    constructor(){
        super(HostRequest)
    }

     async findByUserId(userId: string): Promise<IHostRequest | null> {
    return await HostRequest.findOne({ userId });
  }
}