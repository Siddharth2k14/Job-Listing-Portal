import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: { 
    type: String, 
    enum: ["applicant", "recruiter"], 
    required: true 
  },

  companyName: { type: String },  

  isVerified: { type: Boolean, default: false },

  otp: { type: String },
  otpExpires: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);

