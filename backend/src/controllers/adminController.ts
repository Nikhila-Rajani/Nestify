import { HttpStatus } from "../constants/HttpStatus";
import { MessageConstants } from "../constants/MessageConstants";
import { IAdminService } from "../interfaces/admin/IadminServiceInterface";
import { AppError } from "../utils/AppError";
import { CookieManager } from "../utils/CookieManager";
import { sendError, sendResponse } from "../utils/responseUtilities";
import { Request,Response } from "express";


class AdminController {
  constructor(private _adminService: IAdminService) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new AppError(
          HttpStatus.BadRequest,
          MessageConstants.REQUIRED_FIELDS_MISSING
        );
      }

      const { admin, accessToken, refreshToken } =
        await this._adminService.adminLogin(email, password);
      CookieManager.setAuthCookies(res, { accessToken, refreshToken });
      sendResponse(res, HttpStatus.OK, MessageConstants.LOGIN_SUCCESS, {
        admin,
        email,
        accessToken,
      });
    } catch (error: any) {
      sendError(
        res,
        HttpStatus.Unauthorized,
        MessageConstants.LOGIN_FAILED || error.message
      );
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      CookieManager.clearAuthCookies(res);
      sendResponse(res, HttpStatus.OK, MessageConstants.LOGOUT_SUCCESS);
    } catch (error: any) {
      sendError(
        res,
        HttpStatus.InternalServerError,
        MessageConstants.INTERNAL_SERVER_ERROR
      );
    }
  }

   async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const searchTerm = (req.query.searchTerm as string) || "";
      const isBlocked = (req.query.isBlocked as string) || "all";
      const { users, total } = await this._adminService.getAllUsers(
        page,
        limit,
        searchTerm,
        isBlocked
      );
      sendResponse(res, HttpStatus.OK, MessageConstants.ALL_USERS_RETRIEVED, {
        users,
        total,
        page,
        limit,
      });
    } catch (error: any) {
      sendError(
        res,
        HttpStatus.InternalServerError,
        error.message || MessageConstants.INTERNAL_SERVER_ERROR
      );
    }
  }

    async blockUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId, isBlocked } = req.body;
      if (!userId) {
        throw new AppError(
          HttpStatus.BadRequest,
          MessageConstants.USER_ID_REQUIRED
        );
      }

      const updatedUser = await this._adminService.userBlock(userId, isBlocked);

      const message = isBlocked
        ? MessageConstants.USER_BLOCKED
        : MessageConstants.USER_UNBLOCKED;
      sendResponse(res, HttpStatus.OK, message, { updatedUser });
    } catch (error: any) {
      sendError(res, HttpStatus.BadRequest, error.message);
    }
  }
}



export default AdminController;