// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from "./db/connectDB.js"
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();    // <--- make sure this is here

// const app = express();   // <--- create app BEFORE using it
// const PORT = process.env.PORT || 5000;

// // middleware
// app.use(express.json());

// // allow frontend (React) to talk to backend
// const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
// app.use(cors({ origin: FRONTEND_ORIGIN }));

// // connect DB
// connectDB();

// // routes
// app.use('/api/auth', authRoutes);    // <--- NOW this is correct

// app.get('/', (req, res) => res.send('Job Portal API running'));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

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

app.get('/', (req, res) => {
  res.send("Job Portal API running ✔");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

