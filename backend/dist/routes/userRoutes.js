"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const userService_1 = require("../services/user/userService");
const userRepository_1 = __importDefault(require("../repositories/user/userRepository"));
const express_1 = __importDefault(require("express"));
const userRoute = express_1.default.Router();
const userRepository = new userRepository_1.default();
const userService = new userService_1.UserService(userRepository);
const userController = new userController_1.UserController(userService);
userRoute.post('/login', (req, res) => {
    userController.login(req, res);
});
userRoute.post('/signUp', (req, res) => {
    userController.signup(req, res);
});
// router.post('/login', wrapAsync(login));
// router.post('/signup', wrapAsync(signup));
// router.post('/verify-otp', wrapAsync(verifyOTP));
// router.post('/resend-otp', wrapAsync(resendOTP));
// router.post('/forgot-password', wrapAsync(forgotPassword));
// router.post('/reset-password', wrapAsync(resetPassword));
// router.get('/users', getUsers);    
// router.post('/users/block', wrapAsync(blockUser));
// router.post('/users/unblock', wrapAsync(unblockUser));
exports.default = userRoute;
