import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["applicant", "recruiter"], default: "applicant" },
  },
  { timestamps: true }
);

// THIS is the safe way to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
