

import mongoose, { Schema, model, Document } from "mongoose";


export interface IHostRequest extends Document {
  user: mongoose.Types.ObjectId;
  location: string;
  amenities: string[];
  photos: string[];     
  documents: string[];  
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}


const HostRequestSchema = new Schema<IHostRequest>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },

    amenities: [{ type: String }], 

    photos: [{ type: String }],    
    documents: [{ type: String }], 

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: { type: String },
  },
  { timestamps: true } 
);


export const HostRequest = model<IHostRequest>("HostRequest", HostRequestSchema);
