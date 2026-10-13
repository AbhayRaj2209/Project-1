import './config/env.js';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import passport from './config/passport.js';
import { CORS_ORIGINS } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import atsRoutes from './routes/atsRoutes.js';
import { signup, login } from './controllers/authController.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Behind a hosting proxy (Render, Railway, Heroku...) so req.protocol/IP are correct
app.set('trust proxy', 1);

// Entries may contain a wildcard, e.g. https://*.vercel.app for preview deployments
const originMatchers = CORS_ORIGINS.map((origin) => {
  if (!origin.includes('*')) return (value) => value === origin;
  const pattern = new RegExp(`^${origin.split('*').map((p) => p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^.]+')}$`);
  return (value) => pattern.test(value);
});

app.use(cors({
  origin: (origin, callback) => {
    // Requests without an Origin header (curl, server-to-server, OAuth redirects) are allowed
    if (!origin || originMatchers.some((matches) => matches(origin))) return callback(null, true);
    console.warn(`CORS: blocked request from origin ${origin}. Add it to CORS_ORIGINS or CLIENT_URL.`);
    return callback(null, false);
  },
  credentials: true
}));
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
