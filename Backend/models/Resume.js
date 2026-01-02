// models/Resume.js
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  location: String,
  summary: String,
  education: String,
  experience: String,
  skills: String,
  projects: [{
    title: String,
    description: String,
    technologies: String,
    link: String
  }],
  achievements: String,
  certifications: String,
  languages: String,
  template: { type: String, default: 'classic' }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
