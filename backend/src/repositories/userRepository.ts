import mongoose from 'mongoose';

  class UserRepository {
    private model: mongoose.Model<any>;

    constructor(model: mongoose.Model<any>) {
      this.model = model;
    }

    async findByEmail(email: string) {
      return this.model.findOne({ email }).lean();
    }

    async create(userData: any) {
      const user = new this.model(userData);
      return user.save();
    }

    async update(email: string, updateData: any) {
      return this.model.findOneAndUpdate({ email }, updateData, { new: true }).lean();
    }

    async findAll() { 
      const users = await this.model.find().lean(); 
      return users as any[]; 
    }
  }

  export default UserRepository;