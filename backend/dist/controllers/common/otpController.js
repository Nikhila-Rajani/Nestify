"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const MessageConstants_1 = require("../../constants/MessageConstants");
const HttpStatus_1 = require("../../constants/HttpStatus");
const AppError_1 = require("../../utils/AppError");
const responseUtilities_1 = require("../../utils/responseUtilities");
class OtpController {
    constructor(_otpService) {
        this._otpService = _otpService;
    }
    sendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    throw new AppError_1.AppError(HttpStatus_1.HttpStatus.BadRequest, MessageConstants_1.MessageConstants.EMAIL_REQUIRED);
                }
                yield this._otpService.sentOtp(email);
                (0, responseUtilities_1.sendResponse)(res, HttpStatus_1.HttpStatus.OK, MessageConstants_1.MessageConstants.OTP_SEND);
            }
            catch (error) {
                console.error("Controller Error:", error);
                if (error instanceof AppError_1.AppError) {
                    (0, responseUtilities_1.sendError)(res, error.status, error.message);
                }
                else {
                    (0, responseUtilities_1.sendError)(res, HttpStatus_1.HttpStatus.InternalServerError, MessageConstants_1.MessageConstants.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                if (!email || !otp) {
                    throw new AppError_1.AppError(HttpStatus_1.HttpStatus.BadRequest, MessageConstants_1.MessageConstants.EMAIL_AND_REQUIRED);
                }
                const isOtpValid = yield this._otpService.verifyOtp(email, otp);
                if (!isOtpValid) {
                    throw new AppError_1.AppError(HttpStatus_1.HttpStatus.BadRequest, MessageConstants_1.MessageConstants.INVALID_OTP);
                }
                (0, responseUtilities_1.sendResponse)(res, HttpStatus_1.HttpStatus.OK, MessageConstants_1.MessageConstants.OTP_VERIFIED);
            }
            catch (error) {
                console.error("Controller Error:", error);
                if (error instanceof AppError_1.AppError) {
                    (0, responseUtilities_1.sendError)(res, error.status, error.message);
                }
                else {
                    (0, responseUtilities_1.sendError)(res, HttpStatus_1.HttpStatus.InternalServerError, MessageConstants_1.MessageConstants.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    throw new AppError_1.AppError(HttpStatus_1.HttpStatus.BadRequest, MessageConstants_1.MessageConstants.EMAIL_REQUIRED);
                }
                yield this._otpService.resentOtp(email);
                (0, responseUtilities_1.sendResponse)(res, HttpStatus_1.HttpStatus.OK, MessageConstants_1.MessageConstants.OTP_RESEND);
            }
            catch (error) {
                console.error("Controller Error:", error);
                if (error instanceof AppError_1.AppError) {
                    (0, responseUtilities_1.sendError)(res, error.status, error.message);
                }
                else {
                    (0, responseUtilities_1.sendError)(res, HttpStatus_1.HttpStatus.InternalServerError, MessageConstants_1.MessageConstants.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
}
exports.OtpController = OtpController;
