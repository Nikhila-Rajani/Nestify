
import { UserController } from '../controllers/userController';
import { UserService } from '../services/user/userService';
import UserRepository from '../repositories/user/userRepository';
import express,{ Router, Request, Response } from 'express';



const userRoute : Router = express.Router()
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoute.post('/login',(req:Request,res:Response) =>{
  userController.login(req,res)
})
userRoute.post('/signUp',(req:Request,res:Response)=>{
  userController.signup(req,res)
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
