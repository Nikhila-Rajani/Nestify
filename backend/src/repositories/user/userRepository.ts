import mongoose from 'mongoose';
import User, { IUser } from '../../models/user/userModel';
import { IUserRepositoryInterface } from '../../interfaces/user/IuserRepositoryInterface';
import { googleUserData } from '../../Types/types';
import { BaseRepository } from '../common/BaseRepository';


class UserRepository extends BaseRepository <IUser> implements IUserRepositoryInterface {


  constructor() {
    super(User)
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

   async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    try {
      const user = await User.findById(userId)
      if (user) {
        user.password = hashedPassword;
        await user.save();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Error updating password');
    }
  }

  // async findAll(skip:number,limit:number): Promise<any[]> {
  //  return await User.find().skip(skip).limit(limit).exec()
  // }
  async countAll(): Promise<number> {
    return await User.countDocuments();
  }

    async findById(userId: string): Promise<IUser | null> {
    try {
      // Search for the user by ID
      const user = await User.findById(userId).exec();
      
 
      if (!user) {
        return null;
      }
      
 
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Error finding user');
    }
  }

    async save(user:IUser):Promise<IUser>{
    return await user.save()
  }

}

export default UserRepository;