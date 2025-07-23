import { Router } from 'express';
import {
  login, signup, verifyOTP, resendOTP,
  forgotPassword, resetPassword
} from '../controllers/userController';
import { getUsers, blockUser, unblockUser } from '../controllers/adminController';
import { wrapAsync } from '../utils/wrapAsync';

const router = Router();

router.post('/login', wrapAsync(login));
router.post('/signup', wrapAsync(signup));
router.post('/verify-otp', wrapAsync(verifyOTP));
router.post('/resend-otp', wrapAsync(resendOTP));
router.post('/forgot-password', wrapAsync(forgotPassword));
router.post('/reset-password', wrapAsync(resetPassword));
router.get('/users', getUsers);    
router.post('/users/block', wrapAsync(blockUser));
router.post('/users/unblock', wrapAsync(unblockUser));

export default router;
