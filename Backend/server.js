// server.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file manually
dotenv.config({ path: path.resolve(__dirname, '.env') });

// --- Imports for Authentication ---
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.js'; 

// --- Existing Imports ---
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import resumeRoutes from './routes/resumeRoutes.js';
import atsRoutes from './routes/atsRoutes.js'; 

// --- App Setup ---
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());


// --- Authentication Routes (Your existing code) ---
// SIGNUP ROUTE
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully! You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup.' });
    }
});

// LOGIN ROUTE (returns a JWT token)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Create and send a token on successful login
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// --- Resume Routes ---
app.use('/api/resume', resumeRoutes);

// --- ATS Routes ---
app.use('/api/ats', atsRoutes);

// --- Server and DB Connection (Your existing code) ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});