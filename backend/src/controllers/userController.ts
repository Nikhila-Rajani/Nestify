import { Request, Response, NextFunction } from 'express';
  import UserRepository from '../repositories/userRepository';
  import userModel, { IUser } from '../models/userModel';
  import { generateOTP } from '../utils/otpUtils';

  const userRepository = new UserRepository(userModel);

  export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("its inside the login");
      
      const { email, password } = req.body;
      const user = await userRepository.findByEmail(email) as IUser | null;
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', token: 'temp-token', user: { email: user.email, role: user.role } });
    } catch (error) {
      next(error);
    }
  };

  export const signup = async (req: Request, res: Response, next: NextFunction) => {
    console.log("signuppp");
    
    try {
      console.log("signuppp at try");
      const { email, password, fullName } = req.body;
      const existingUser = await userRepository.findByEmail(email) as IUser | null;
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const otp = generateOTP();
      console.log(`Generated OTP for ${email}: ${otp}`);
      const user = await userRepository.create({ email, password, fullName, otp }) as IUser;
      res.status(201).json({ message: 'User created, please verify OTP', user: { email: user.email } });
    } catch (error) {
      next(error);
    }
  };

  export const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("its verify otp");
      const { email, otp } = req.body;
      const user = await userRepository.findByEmail(email) as IUser | null;
      if (!user || user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      await userRepository.update(email, { otp: null, isVerified: true });
      res.status(200).json({ message: 'OTP verified', token: 'temp-token', user: { email: user.email, role: user.role } });
    } catch (error) {
      next(error);
    }
  };

  export const resendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const user = await userRepository.findByEmail(email) as IUser | null;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const otp = generateOTP();
      console.log("resend otp isss",otp);
      
      await userRepository.update(email, { otp });
      res.status(200).json({ message: 'OTP resent', email });
    } catch (error) {
      next(error);
    }
  };

  export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const user = await userRepository.findByEmail(email) as IUser | null;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const otp = generateOTP();
      console.log("forotpasss otp isss",otp);
      await userRepository.update(email, { otp });
      res.status(200).json({ message: 'OTP sent for password reset', email });
    } catch (error) {
      next(error);
    }
  };

  export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await userRepository.findByEmail(email) as IUser | null;
      if (!user || user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      await userRepository.update(email, { password: newPassword, otp: null });
      res.status(200).json({ message: 'Password reset successful', token: 'temp-token', email });
    } catch (error) {
      next(error);
    }
  };

  // export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { token } = req.body;
  //     const email = `google-${Math.random().toString(36).substr(2, 9)}@example.com`;
  //     let user = await userRepository.findByEmail(email) as IUser | null;
  //     if (!user) {
  //       user = await userRepository.create({ email, password: 'google-auth', fullName: 'Google User', role: 'user', isVerified: true }) as IUser;
  //     }
  //     res.status(200).json({ message: 'Google login successful', token: 'temp-token', user: { email: user.email, role: user.role } });
  //   } catch (error) {
  //     next(error);
  //   }
  // };