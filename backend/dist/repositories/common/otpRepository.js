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
exports.OtpRepository = void 0;
const otpModel_1 = require("../../models/common/otpModel");
class OtpRepository {
    storeOtp(otp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield otpModel_1.otp.deleteMany({ email });
                const newOtp = new otpModel_1.otp({ email, otp });
                yield newOtp.save();
                return true;
            }
            catch (error) {
                console.log(error.message);
                return false;
            }
        });
    }
    findOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield otpModel_1.otp.findOne({ email }).sort({ createdAt: -1 });
            }
            catch (error) {
                console.log(error.message);
                return null;
            }
        });
    }
}
exports.OtpRepository = OtpRepository;
