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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utils/jwt");
const AppError_1 = require("../../utils/AppError");
const HttpStatus_1 = require("../../constants/HttpStatus");
const MessageConstants_1 = require("../../constants/MessageConstants");
class UserService {
    constructor(_userRepo) {
        this._userRepo = _userRepo;
    }
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepo.findByEmail(email);
                if (!user) {
                    throw new AppError_1.AppError(HttpStatus_1.HttpStatus.NotFound, MessageConstants_1.MessageConstants.USER_NOT_FOUND);
                }
                const isPassword = user.password ? yield bcrypt_1.default.compare(password, user.password) : false;
                if (!isPassword) {
                    throw new AppError_1.AppError(HttpStatus_1.HttpStatus.Unauthorized, MessageConstants_1.MessageConstants.INVALID_PASSWORD);
                }
                const accessToken = (0, jwt_1.generateAccessToken)({ id: user._id.toString(), role: 'user', email: user.email });
                const refreshToken = (0, jwt_1.generateRefreshToken)({ id: user._id.toString(), role: 'user', email: user.email });
                return { user, accessToken, refreshToken };
            }
            catch (error) {
                if (error instanceof AppError_1.AppError)
                    throw error;
                throw new AppError_1.AppError(HttpStatus_1.HttpStatus.InternalServerError, MessageConstants_1.MessageConstants.INTERNAL_SERVER_ERROR);
            }
        });
    }
    registerUser(fullName, email, password, mobile_no) {
        return __awaiter(this, void 0, void 0, function* () {
            const exstingUser = yield this._userRepo.findByEmail(email);
            if (exstingUser) {
                console.log("Register: User already exists for email:", email);
                throw new Error("User with this email already exists.");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const userData = {
                fullName,
                email,
                password: hashedPassword,
                mobile_no,
                is_verified: true,
                is_blocked: false,
            };
            return yield this._userRepo.create(userData);
        });
    }
}
exports.UserService = UserService;
