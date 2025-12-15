import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './api/routes/admin-route.js';
import blogRoutes from './api/routes/blog-route.js';
import serviceRoutes from './api/routes/service-route.js';
dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.get('/', (_, res) => {
    res.send('Server is running'); 
});
app.use('/api/admin',adminRoutes)
app.use('/api/blog',blogRoutes)
app.use('/api/service',serviceRoutes)

mongoose.connect(MONGO_URL, 
    console.log("✅ Connected to MongoDB")
)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});