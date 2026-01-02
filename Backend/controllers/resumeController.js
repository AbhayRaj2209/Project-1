import Resume from '../models/Resume.js';

// Save a new resume
export const saveResume = async (req, res) => {
  try {
    // Validate required fields
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        details: 'Name and email are required' 
      });
    }

    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json({ 
      message: 'Resume saved successfully',
      resumeId: newResume._id
    });
  } catch (error) {
    console.error('Save error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.message 
      });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: 'Duplicate entry', 
        details: 'A resume with this email already exists' 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to save resume'
    });
  }
};

// Get resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Resume not found' 
      });
    }
    res.json(resume);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch resume'
    });
  }
};

// Get all resumes
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ updatedAt: -1 });
    res.json({ resumes });
  } catch (error) {
    console.error('Fetch all resumes error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch resumes'
    });
  }
};

// Delete resume by ID
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Resume not found' 
      });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to delete resume'
    });
  }
};

// Update resume by ID
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!resume) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Resume not found' 
      });
    }
    res.json({ message: 'Resume updated successfully', resume });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to update resume'
    });
  }
};