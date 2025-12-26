import express from "express";
import jwt from "jsonwebtoken";
import Applications from "./Applications.js";

const router = express.Router();

/* 🔹 Get recruiter applications */
router.get("/applications", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const apps = await Applications.find({ recruiterId: decoded.id })
      .populate("applicantId", "name email");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* 🔹 Mark application as viewed */
router.put("/applications/view/:id", async (req, res) => {
  await Applications.findByIdAndUpdate(req.params.id, {
    status: "viewed"
  });
  res.json({ success: true });
});

/* 🔹 Send acceptance */
router.post("/applications/accept/:id", async (req, res) => {
  const { message } = req.body;

  await Applications.findByIdAndUpdate(req.params.id, {
    status: "accepted",
    acceptanceMessage: message
  });

  res.json({ success: true });
});

export default router;
