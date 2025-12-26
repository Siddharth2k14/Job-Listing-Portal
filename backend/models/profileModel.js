import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  basicInfo: {
    name: String,
    email: String,
    phone: String,
    summary: String,
  },
  
  bio: { type: String },
  skills: [String],

  resume: {
    fileId: mongoose.Schema.Types.ObjectId,
    filename: String,
    mimetype: String,
  },

  certifications: [
    {
      title: String,
      issuer: String,
      year: String,
      description: String,
      fileId: mongoose.Schema.Types.ObjectId,
      mimetype: String,
    },
  ],

  publications: [
    {
      title: String,
      journal: String,
      year: String,
      description: String,
      fileId: mongoose.Schema.Types.ObjectId,
      mimetype: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
