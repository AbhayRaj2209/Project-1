import jwt from 'jsonwebtoken';
import User from '../user.js';
import asyncHandler from './asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.userId).select('-password');

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  next();
});

export default protect;
