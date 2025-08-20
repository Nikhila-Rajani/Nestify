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
    google_id?: string;
    createdAt: Date;
    updatedAt: Date;
    otp?: string;
  }

  const userSchema: Schema = new Schema<IUser>(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String },
      fullName: { type: String, required: true },
      mobile_no : {type :String},
      role: { type: String, enum: ['user', 'admin', 'host'], default: 'user' },
      status: { type: String, enum: ['active', 'blocked'], default: 'active' },
      isBlocked: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      google_id: { type: String },
      otp: { type: String },
    },
    { timestamps: true }
  );

  const userModel = mongoose.model<IUser>('User', userSchema);

  export default userModel;
  export { IUser };