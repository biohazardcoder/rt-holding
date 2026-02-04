import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './api/routes/admin-route.js';
import blogRoutes from './api/routes/blog-route.js';
import serviceRoutes from './api/routes/service-route.js';
import storyRoutes from './api/routes/story-route.js';
import commentRoutes from './api/routes/comment-route.js';
import contactRoutes from './api/routes/contact-route.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    res.send('Server is running');
});
app.use('/api/admin', adminRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/story', storyRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/contact', contactRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected!'))
    .catch(err => {
        console.error('❌ Ulanishda hali ham xato bor:');
        console.error('Xato kodi:', err.code);
        console.error('Xato matni:', err);
    });

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

