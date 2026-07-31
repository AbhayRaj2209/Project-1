import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import atsRoutes from './routes/atsRoutes.js';
import { signup, login } from './controllers/authController.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(passport.initialize());

app.get('/about', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Resume Builder API testing!' });
});

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Backend Running Successfully' });
});

app.post('/api/signup', signup);
app.post('/api/login', login);
app.post('/api/forgot-password', (req, res, next) => {
  req.url = '/forgot-password';
  authRoutes.handle(req, res, next);
});
app.post('/api/reset-password', (req, res, next) => {
  req.url = '/reset-password';
  authRoutes.handle(req, res, next);
});

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
