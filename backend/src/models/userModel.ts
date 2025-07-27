import mongoose, { Document, ObjectId, Schema } from 'mongoose';

  interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    fullName: string;
    mobile_no : string
    role: 'user' | 'admin' | 'host';
    status: 'active' | 'blocked';
    isBlocked: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    otp?: string;
  }

  const userSchema: Schema = new Schema<IUser>(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      fullName: { type: String, required: true },
      mobile_no : {type :String, required:true},
      role: { type: String, enum: ['user', 'admin', 'host'], default: 'user' },
      status: { type: String, enum: ['active', 'blocked'], default: 'active' },
      isBlocked: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      otp: { type: String },
    },
    { timestamps: true }
  );

  const userModel = mongoose.model<IUser>('User', userSchema);

  export default userModel;
  export { IUser };