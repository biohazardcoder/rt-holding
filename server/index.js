import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './api/routes/admin-route.js';
dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.get('/', (_, res) => {
    res.send('Server is running');
});
app.use('/api/admin',adminRoutes)

mongoose.connect(MONGO_URL, 
    console.log("✅ Connected to MongoDB")
)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});