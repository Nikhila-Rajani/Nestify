// Import:
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectDB } from './Database/dB';

// ROUTES:
import UserRoute from './routes/userRoutes';
import adminRoute from './routes/adminRoutes';
import hostRoute from './routes/hostRoutes';
import otpRoute from './routes/common/otpRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cors initalisation
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

// DB connection
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.use('/v1/user', UserRoute)
app.use('/v1/admin', adminRoute)
app.use('/v1/host', hostRoute)
app.use('/v1/user/otp', otpRoute)

// app.use('*',(req,res)=> {
//   res.status(404).json({message:"Endpoint not found"})
// })

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, (error?:Error) => {
  if(!error){
    console.log(`Nestify backend running on port ${PORT}`);
  }else{
    console.error("Server Error :", error.message);
    
  }
  
});

export default app;