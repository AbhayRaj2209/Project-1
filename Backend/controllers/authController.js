import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../user.js';
import asyncHandler from '../middleware/asyncHandler.js';

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User created successfully! You can now log in.' });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.password) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  res.status(200).json({ message: 'Login successful', token });
});

const googleCallback = asyncHandler(async (req, res) => {
  const token = generateToken(req.user);
  const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  res.send(`
    <script>
      const token = "${token}";
      if (window.opener) {
        window.opener.postMessage({ token }, "${frontendUrl}");
        window.close();
      } else {
        window.location.replace("${frontendUrl}/auth/callback?token=" + encodeURIComponent(token));
      }
    </script>
  `);
});

const githubCallback = asyncHandler(async (req, res) => {
  const token = generateToken(req.user);
  const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  res.send(`
    <script>
      const token = "${token}";
      if (window.opener) {
        window.opener.postMessage({ token }, "${frontendUrl}");
        window.close();
      } else {
        window.location.replace("${frontendUrl}/auth/callback?token=" + encodeURIComponent(token));
      }
    </script>
  `);
});

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(200).json({
      message: 'If an account exists for that email, a password reset link has been sent.'
    });
  }

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const resetLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

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
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400);
    throw new Error('Token and password are required');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
});

export { signup, login, googleCallback, githubCallback, requestPasswordReset, resetPassword, generateToken };
export default { signup, login, googleCallback, githubCallback, requestPasswordReset, resetPassword, generateToken };
