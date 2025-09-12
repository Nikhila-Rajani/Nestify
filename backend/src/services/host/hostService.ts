import { Types } from "mongoose";
import { HttpStatus } from "../../constants/HttpStatus";
import { MessageConstants } from "../../constants/MessageConstants";
import { IHostReporitory } from "../../interfaces/host/IHostRepository";
import { IHostServiceInterface } from "../../interfaces/host/IHostServiceInterface";
import { IHostRequest } from "../../models/host/hostModel";
import { AppError } from "../../utils/AppError";

export class HostService implements IHostServiceInterface {
    constructor(private _hostRepository: IHostReporitory) {

    }
    async requestHost(data: Partial<IHostRequest>): Promise<IHostRequest> {
        // prevent duplicate requests
        try {
            const userId = new Types.ObjectId(data.user);
            const existing = await this._hostRepository.findByUserId(userId.toString());
            if (existing) throw new Error("Request already submitted");

            return await this._hostRepository.create(data);
        } catch (error) {
            
                if (error instanceof AppError) throw error;
                throw new AppError(
                    HttpStatus.InternalServerError,
                    MessageConstants.INTERNAL_SERVER_ERROR
                );
            

        }

    }
}