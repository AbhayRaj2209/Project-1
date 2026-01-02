// routes/atsRoutes.js
import express from 'express';
import { checkATSScore, getSuggestions } from '../controllers/atsController.js';

const router = express.Router();

// ATS Score Check Route
router.post('/check', checkATSScore);

// Get AI Suggestions Route
router.post('/suggestions', getSuggestions);

export default router;
