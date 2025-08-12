"use strict";
// import { Request, Response, NextFunction } from 'express';
//   import UserRepository from '../repositories/user/userRepository';
//   import userModel, { IUser } from '../models/userModel';
//   const userRepository = new UserRepository(userModel);
//   export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await userRepository.findAll() as IUser[];
//       res.status(200).json({ users });
//     } catch (error) {
//       next(error);
//     }
//   };
//   export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { email } = req.body;
//       const user = await userRepository.findByEmail(email) as IUser | null;
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       await userRepository.update(email, { status: 'blocked', isBlocked: true });
//       res.status(200).json({ message: 'User blocked', email });
//     } catch (error) {
//       next(error);
//     }
//   };
//   export const unblockUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { email } = req.body;
//       const user = await userRepository.findByEmail(email) as IUser | null;
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       await userRepository.update(email, { status: 'active', isBlocked: false });
//       res.status(200).json({ message: 'User unblocked', email });
//     } catch (error) {
//       next(error);
//     }
//   };
