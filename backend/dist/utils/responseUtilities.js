"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.CommonResponse = void 0;
exports.sendResponse = sendResponse;
exports.sendError = sendError;
const logger_1 = __importDefault(require("./logger"));
//CommonResponse Class
class CommonResponse {
    constructor(message, data) {
        this.success = true,
            this.message = message,
            this.data = data;
    }
}
exports.CommonResponse = CommonResponse;
// Utility function for sending successful responses
function sendResponse(res, statusCode, message, data) {
    const response = new CommonResponse(message, data);
    // Log the success response
    logger_1.default.info(`Success Response - Status: ${statusCode}, Message: ${message}, Data: ${JSON.stringify(data)}`);
    res.status(statusCode).json(response);
}
// ErrorResponse Class
class ErrorResponse {
    constructor(message, error) {
        this.success = false;
        this.message = message;
        this.error = error;
    }
}
exports.ErrorResponse = ErrorResponse;
// Utility function for sending error responses
function sendError(res, statusCode, message, additionalData // Add this parameter
) {
    const errorResponse = {
        success: false,
        message: message,
    };
    if (additionalData) {
        errorResponse.data = additionalData; // Store additional data in 'data' field
    }
    logger_1.default.error(`Error Response - Status: ${statusCode}, Message: ${message}`);
    res.status(statusCode).json(errorResponse);
}
