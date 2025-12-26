import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";
import { uploadResume, getProfile, streamFile } from "./profileController.js";

const router = express.Router();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);

        resolve({
          filename: buf.toString("hex") + path.extname(file.originalname),
          bucketName: "uploads",
          metadata: {
            userId: req.user.id,
            type: file.mimetype
          }
        });
      });
    });
  }
});

const upload = multer({ storage });

router.post("/resume", protect, upload.single("resume"), uploadResume);
router.get("/:userId", protect, getProfile);
router.get("/file/:fileId", protect, streamFile);

export default router;
