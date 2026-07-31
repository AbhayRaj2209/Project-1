import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
      trim: true
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    displayName: {
      type: String,
      trim: true,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLoginAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false
  }
);

export default mongoose.model('User', userSchema);

