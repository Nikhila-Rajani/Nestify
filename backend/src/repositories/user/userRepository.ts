import mongoose from 'mongoose';
import User, { IUser } from '../../models/userModel';
import { IUserRepositoryInterface } from '../../interfaces/user/IuserRepositoryInterface';
import { googleUserData } from '../../Types/types';


class UserRepository implements IUserRepositoryInterface {


  constructor() {

  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).lean();
  }


  async create(user: Partial<IUser> | googleUserData): Promise<IUser> {

    try {
      // If the user is coming from Google Sign-In, add the google_id
      if ('uid' in user) {
        const googleUser: googleUserData = user;
        const newUser = new User({
          name: googleUser.name,
          email: googleUser.email,
          google_id: googleUser.uid,
          isVerified: googleUser.email_verified,
          isBlocked: false, // Default to false
        });

        const savedUser = await newUser.save();
        console.log('After Save (Google User):', savedUser);
        return savedUser;
      } else {

        const newUser = new User({
          ...user,
        });
        console.log('Before Save (Standard User):', newUser);
        const savedUser = await newUser.save();
        console.log('After Save (Standard User):', savedUser);
        return savedUser;
      }


    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Unable to save user');
    }
  }

  // async create(userData: any) {
  //   const user = new this.model(userData);
  //   return user.save();
  // }

  // async update(email: string, updateData: any) {
  //   return this.model.findOneAndUpdate({ email }, updateData, { new: true }).lean();
  // }

  // async findAll() { 
  //   const users = await this.model.find().lean(); 
  //   return users as any[]; 
  // }
}

export default UserRepository;