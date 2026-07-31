// models/Resume.js
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    summary: { type: String, trim: true },
    education: { type: String, trim: true },
    experience: { type: String, trim: true },
    skills: { type: String, trim: true },
    projects: [{
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      technologies: { type: String, trim: true },
      link: { type: String, trim: true }
    }],
    achievements: { type: String, trim: true },
    certifications: { type: String, trim: true },
    languages: { type: String, trim: true },
    template: { type: String, default: 'classic', trim: true }
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false
  }
);

resumeSchema.index({ email: 1 });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
