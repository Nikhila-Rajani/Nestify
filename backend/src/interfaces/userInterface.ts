import { Document } from 'mongoose';

     export interface IUser extends Document {
       email: string;
       password: string;
       fullName: string;
       role: 'user' | 'admin';
       status: 'active' | 'blocked';
       createdAt: Date;
       updatedAt: Date;
     }