// routes/resumeRoutes.js
import express from 'express';
// ✅ Import AI functions (suggestions) from suggestionController
import { getSuggestions } from '../controllers/suggestionController.js';
// ✅ Import CRUD functions from the dedicated resumeController
import { saveResume, getResumeById, getAllResumes, deleteResume, updateResume } from '../controllers/resumeController.js';

const router = express.Router();

// Resume CRUD operations
router.post('/save', saveResume); 
router.get('/list', getAllResumes);
router.get('/:id', getResumeById); 
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

// AI suggestions (Text-based, non-file)
router.post('/suggest', getSuggestions); 

export default router;