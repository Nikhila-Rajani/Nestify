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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
exports.hashOtp = hashOtp;
exports.compareOtps = compareOtps;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateOtp = () => {
    const length = 6;
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
};
exports.generateOtp = generateOtp;
function hashOtp(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedOtp = yield bcrypt_1.default.hash(otp, 10);
            return hashedOtp;
        }
        catch (error) {
            console.log(error.message);
            throw new Error();
        }
    });
}
function compareOtps(otp, otpDb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isMatch = yield bcrypt_1.default.compare(otp, otpDb);
            return isMatch;
        }
        catch (error) {
            console.log(error.any);
            throw new Error('wrong otp');
        }
    });
}
