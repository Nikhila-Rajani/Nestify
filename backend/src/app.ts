import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import cors from 'cors';
  import authRoutes from './routes/authRoutes';
  import { Request, Response, NextFunction } from 'express';


  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/v1/auth', authRoutes);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  // MongoDB connection
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

  app.listen(PORT, () => {
    console.log(`Nestify backend running on port ${PORT}`);
  });

  export default app;