import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL ;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello smit final backend!');
});


// DATABASE CONNECTION
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
    });
