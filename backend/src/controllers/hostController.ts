import { HttpStatus } from "../constants/HttpStatus";
import { MessageConstants } from "../constants/MessageConstants";
import { IHostServiceInterface } from "../interfaces/host/IHostServiceInterface";
import { sendError, sendResponse } from "../utils/responseUtilities";
import { Request, Response } from "express";

export class HostControlller {
    
    constructor(private _hostService:IHostServiceInterface){

    }
    async requestHost(req: Request, res: Response): Promise<void> {
    try {
      const { userId, location, amenities, photos, documents } = req.body;
      const request = await this._hostService.requestHost({
        user: userId, // make sure this matches your service/DTO typing
        location,
        amenities,
        photos,
        documents,
      });
      sendResponse(res,HttpStatus.OK,MessageConstants.SEND_HOST_REQUEST)
    } catch (err: any) {
      
      sendError(
        res,
        HttpStatus.InternalServerError,
        MessageConstants.INTERNAL_SERVER_ERROR,
        err.message
      );
    
    }
  }
}