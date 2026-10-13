import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../user.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { CLIENT_URL } from '../config/env.js';

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const MIN_PASSWORD = 6;

const normalizeEmail = (email) => (typeof email === 'string' ? email.trim().toLowerCase() : '');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

const signup = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = req.body?.password;

  if (!EMAIL_RE.test(email)) {
    res.status(400);
    throw new Error('Please enter a valid email address.');
  }
  if (typeof password !== 'string' || password.length < MIN_PASSWORD) {
    res.status(400);
    throw new Error(`Password must be at least ${MIN_PASSWORD} characters.`);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error(existingUser.password
      ? 'User with this email already exists.'
      : 'This email is registered with Google or GitHub sign-in. Use that button to log in.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ email, password: hashedPassword });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      throw new Error('User with this email already exists.');
    }
    throw error;
  }

  res.status(201).json({ message: 'User created successfully! You can now log in.' });
});

const login = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = req.body?.password;

  if (!email || typeof password !== 'string' || !password) {
    res.status(400);
    throw new Error('Email and password are required.');
  }

  const user = await User.findOne({ email });

  if (user && !user.password && (user.googleId || user.githubId)) {
    res.status(401);
    throw new Error(`This account uses ${user.googleId ? 'Google' : 'GitHub'} sign-in. Use that button to log in.`);
  }

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken(user);
  res.status(200).json({ message: 'Login successful', token });
});

// OAuth success: send the browser back to the frontend with the token in the URL
// fragment (fragments are never sent to servers, so the token stays out of logs).
// A plain redirect works everywhere — the previous popup + postMessage approach
// broke when the popup lost its opener or the frontend route did not exist.
const oauthSuccess = (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`${CLIENT_URL}/login-success#token=${encodeURIComponent(token)}`);
};

const oauthFailure = (res, message) => {
  res.redirect(`${CLIENT_URL}/login?oauth_error=${encodeURIComponent(message)}`);
};

const googleCallback = oauthSuccess;
const githubCallback = oauthSuccess;

const requestPasswordReset = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      message: 'If an account exists for that email, a password reset link has been sent.'
    });
  }

  const resetToken = jwt.sign({ userId: user._id, purpose: 'reset' }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const resetLink = `${CLIENT_URL}/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || 'resume.builder@example.com',
    to: user.email,
    subject: 'Password Reset Request',
    html: `<p>Hello,</p><p>Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p><p>This link expires in 15 minutes.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Password reset email failed:', error.message);
  }

  res.status(200).json({
    message: 'If an account exists for that email, a password reset link has been sent.'
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body || {};

  if (!token || !password) {
    res.status(400);
    throw new Error('Token and password are required');
  }
  if (typeof password !== 'string' || password.length < MIN_PASSWORD) {
    res.status(400);
    throw new Error(`Password must be at least ${MIN_PASSWORD} characters.`);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.purpose !== 'reset') throw new Error('not a reset token');
  } catch {
    res.status(400);
    throw new Error('This reset link is invalid or has expired. Please request a new one.');
  }

  const user = await User.findById(decoded.userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: 'Password reset successful. You can now sign in.' });
});

export { signup, login, googleCallback, githubCallback, oauthFailure, requestPasswordReset, resetPassword, generateToken };
export default { signup, login, googleCallback, githubCallback, oauthFailure, requestPasswordReset, resetPassword, generateToken };
