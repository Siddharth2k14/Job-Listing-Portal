import express from 'express';
import dotenv from 'dotenv';
import connectAuthDB from './db/connectDB.js';
import authRoutes from './routes/authRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

connectAuthDB(); 

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Job Portal API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
