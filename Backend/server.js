import { PORT, validateEnv } from './config/env.js';
import app from './app.js';
import connectDB from './utils/connectDB.js';

validateEnv();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log('  MongoDB Connected Successfully');
    console.log(` Server running on: http://localhost:${PORT}`);
    console.log('-------------------------------------------');
  });
});
