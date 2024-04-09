import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/UserRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

