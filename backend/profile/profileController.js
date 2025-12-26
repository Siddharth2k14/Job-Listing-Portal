import Profile from "../models/profileModel.js";
import { gridfsBucket } from "../gridfs/gridfs.js";
import mongoose from "mongoose";

/* Upload Resume */
export const uploadResume = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = await Profile.create({ userId: req.user.id });
    }

    profile.resume = {
      fileId: req.file.id,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
    };

    await profile.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};

/* Get Profile */
export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.userId });
  res.json(profile);
};

/* Stream file (VIEW ONLY) */
export const streamFile = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", "inline");

    gridfsBucket.openDownloadStream(fileId).pipe(res);
  } catch (err) {
    res.status(404).json({ message: "File not found" });
  }
};
