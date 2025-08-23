
import { UserController } from '../controllers/userController';
import { UserService } from '../services/user/userService';
import UserRepository from '../repositories/user/userRepository';
import express,{ Router, Request, Response } from 'express';
import { OtpRepository } from '../repositories/common/otpRepository';
import blockedUserMiddleware from '../middlewares/blockedUserMiddleware';



const userRoute : Router = express.Router()
const userRepository = new UserRepository()
const otpRepository = new OtpRepository()
const userService = new UserService(userRepository,otpRepository)
const userController = new UserController(userService)

userRoute.post('/login',blockedUserMiddleware,(req:Request,res:Response) =>{
  userController.login(req,res)
})
userRoute.post('/signUp',(req:Request,res:Response)=>{
  userController.signup(req,res)
})
userRoute.post('/google',(req:Request,res: Response) => {
  userController.googleSignIn(req,res)
})
userRoute.post('/logout',(req:Request,res:Response)=> {
  userController.logout(req,res)
})
userRoute.post('/forgot-password',(req:Request,res:Response) => {
  userController.forgotPassword(req,res)
})
userRoute.post('/reset-password',(req:Request,res:Response) => {
  userController.resetPassword(req,res)
})


// router.post('/login', wrapAsync(login));
// router.post('/signup', wrapAsync(signup));
// router.post('/verify-otp', wrapAsync(verifyOTP));
// router.post('/resend-otp', wrapAsync(resendOTP));
// router.post('/forgot-password', wrapAsync(forgotPassword));
// router.post('/reset-password', wrapAsync(resetPassword));
// router.get('/users', getUsers);    
// router.post('/users/block', wrapAsync(blockUser));
// router.post('/users/unblock', wrapAsync(unblockUser));

export default userRoute;
