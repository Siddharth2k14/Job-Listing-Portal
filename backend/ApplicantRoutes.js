import express from "express";
import jwt from "jsonwebtoken";
import Applications from "./Applications.js";

const router = express.Router();

router.get("/applications", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const apps = await Applications.find({
    applicantId: decoded.id
  });

  res.json(apps);
});

export default router;
