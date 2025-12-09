import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./db/connectDB.js"
import authRoutes from "./routes/authRoutes.js";

dotenv.config();    // <--- make sure this is here

const app = express();   // <--- create app BEFORE using it
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// allow frontend (React) to talk to backend
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND_ORIGIN }));

// connect DB
connectDB();

// routes
app.use('/api/auth', authRoutes);    // <--- NOW this is correct

app.get('/', (req, res) => res.send('Job Portal API running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
