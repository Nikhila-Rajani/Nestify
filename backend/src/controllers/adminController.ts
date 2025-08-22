import { HttpStatus } from "../constants/HttpStatus";
import { MessageConstants } from "../constants/MessageConstants";
import { AppError } from "../utils/AppError";
import { CookieManager } from "../utils/CookieManager";
import { sendError, sendResponse } from "../utils/responseUtilities";


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
}