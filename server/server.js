import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);

const PORT =  8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });