import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },

  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  applicantName: String,
  applicantEmail: String,

  resume: String,
  coverLetter: String,

  status: {
    type: String,
    enum: ["pending", "viewed", "accepted", "rejected"],
    default: "pending"
  },

  acceptanceMessage: {
    type: String,
    default: ""
  },

  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Application", applicationSchema);
