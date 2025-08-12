import mongoose from 'mongoose';
import User,{ IUser } from '../../models/userModel';
import { IUserRepositoryInterface } from '../../interfaces/user/IuserRepositoryInterface';


  class UserRepository implements IUserRepositoryInterface {
    

    constructor() {
      
    }

    async findByEmail(email: string) : Promise <IUser|null> {
      return await User.findOne({ email }).lean();
    }

    async create(userData: Partial<IUser>): Promise<IUser> {
        try {
           const newUser = new User({
          ...userData,
        });
        console.log('Before Save (Standard User):', newUser);
        const savedUser = await newUser.save();
        console.log('After Save (Standard User):', savedUser);  
        return savedUser;

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