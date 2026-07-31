import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './utils/connectDB.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log('  MongoDB Connected Successfully');
    console.log(` Server running on: http://localhost:${PORT}`);
    console.log('-------------------------------------------');
  });
});
