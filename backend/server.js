import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./connectDB.js";
import authRoutes from "./authRoutes.js";
import multer from "multer";
import fs from "fs";
dotenv.config();
// Storage for resume files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
const app = express();
const PORT = process.env.PORT || 5000;

// Allow ANY local frontend (3000, 3001, 5173, 3020, etc.)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://192.168.1.3:3002"
  ],
  credentials: true,
}));

app.use(express.json());

// Connect DB
connectDB();

// Auth routes
app.use('/api/auth', authRoutes);

app.post("/apply-job", upload.single("resume"), (req, res) => {
  try {
    const { name, email, phone, coverLetter, jobTitle } = req.body;
    const resumeName = req.file ? req.file.filename : null;

    // Load existing applications
    let applications = [];
    if (fs.existsSync("applications.json")) {
      applications = JSON.parse(fs.readFileSync("applications.json"));
    }

    // Add new application
    const newApp = {
      id: Date.now(),
      name,
      email,
      phone,
      coverLetter,
      jobTitle,
      resumeName,
    };
    applications.push(newApp);

    // Save back to file
    fs.writeFileSync("applications.json", JSON.stringify(applications, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


app.get('/', (req, res) => {
  res.send("Job Portal API running ✔");
});
app.post("/save-profile", (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  fs.writeFileSync("profile.json", data);
  res.json({ success: true });
});
app.post("/upload-resume", upload.single("resume"), (req, res) => {
  res.json({
    success: true,
    filename: req.file.filename,
    originalName: req.file.originalname
  });
});
app.get("/get-profile", (req, res) => {
  if (!fs.existsSync("profile.json")) {
    return res.json(null);
  }
  const data = JSON.parse(fs.readFileSync("profile.json"));
  res.json(data);
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
