"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpController_1 = require("../../controllers/common/otpController");
const otpService_1 = require("../../services/common/otpService");
const otpRepository_1 = require("../../repositories/common/otpRepository");
const otpRepository = new otpRepository_1.OtpRepository();
const otpService = new otpService_1.OtpService(otpRepository);
const otpController = new otpController_1.OtpController(otpService);
const otpRoute = express_1.default.Router();
otpRoute.post('/send', (req, res) => otpController.sendOtp(req, res));
otpRoute.post('/verify', (req, res) => otpController.verifyOtp(req, res));
otpRoute.post('/resend', (req, res) => otpController.resendOtp(req, res));
exports.default = otpRoute;
