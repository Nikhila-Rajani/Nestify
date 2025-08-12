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
exports.OtpService = void 0;
const generateOtp_1 = require("../../utils/generateOtp");
const sentMail_1 = require("../../utils/sentMail");
class OtpService {
    constructor(_otpRepository) {
        this._otpRepository = _otpRepository;
    }
    sentOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = (0, generateOtp_1.generateOtp)(); // Generate a new OTP
            const hashedOtp = yield (0, generateOtp_1.hashOtp)(otp);
            const stored = yield this._otpRepository.storeOtp(hashedOtp, email);
            if (!stored)
                throw new Error('Error storing OTP.');
            console.log('Generated OTP:', otp);
            // Send OTP via email
            const mailSent = yield (0, sentMail_1.sentMail)(email, 'OTP Verification', ` <p>Your OTP is: <strong>${otp}</strong></p>`);
            if (!mailSent)
                throw new Error('Error sending OTP.');
            return true;
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedOtp = yield this._otpRepository.findOtp(email);
            if (!storedOtp)
                throw new Error('No valid OTP found for this email. It may have expired.');
            const isValid = yield (0, generateOtp_1.compareOtps)(otp, storedOtp.otp);
            if (!isValid)
                throw new Error('Invalid OTP.');
            return true;
        });
    }
    resentOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sentOtp(email);
        });
    }
}
exports.OtpService = OtpService;
