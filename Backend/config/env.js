// config/env.js — loads and sanitises environment variables. Import this first.
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Always load Backend/.env regardless of the directory the server is started from.
// On hosting platforms (Render, Railway, ...) variables come from the dashboard and
// this is a no-op.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Hosting dashboards store values literally, so a value pasted as "abc" (with quotes)
// or with stray whitespace would otherwise break OAuth client IDs, secrets and URLs.
const SANITISE = [
  'MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN',
  'CLIENT_URL', 'BACKEND_URL', 'CORS_ORIGINS',
  'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL',
  'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_CALLBACK_URL',
  'EMAIL_USER', 'EMAIL_PASS',
];

for (const key of SANITISE) {
  const raw = process.env[key];
  if (typeof raw !== 'string') continue;
  let value = raw.trim();
  if (value.length >= 2 && (value[0] === '"' || value[0] === "'") && value.at(-1) === value[0]) {
    value = value.slice(1, -1).trim();
  }
  process.env[key] = value;
}

const stripTrailingSlash = (url) => url.replace(/\/+$/, '');

const PLACEHOLDER = /^(your[_-]|changeme|xxx|<)/i;
const isRealValue = (value) => Boolean(value) && !PLACEHOLDER.test(value);

export const PORT = process.env.PORT || 5000;
export const CLIENT_URL = stripTrailingSlash(process.env.CLIENT_URL || 'http://localhost:5173');
export const BACKEND_URL = stripTrailingSlash(process.env.BACKEND_URL || `http://localhost:${PORT}`);

export const CORS_ORIGINS = (process.env.CORS_ORIGINS || CLIENT_URL)
  .split(',')
  .map((origin) => stripTrailingSlash(origin.trim()))
  .filter(Boolean);

export const oauthConfig = {
  google: {
    enabled: isRealValue(process.env.GOOGLE_CLIENT_ID) && isRealValue(process.env.GOOGLE_CLIENT_SECRET),
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || `${BACKEND_URL}/api/auth/google/callback`,
  },
  github: {
    enabled: isRealValue(process.env.GITHUB_CLIENT_ID) && isRealValue(process.env.GITHUB_CLIENT_SECRET),
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || `${BACKEND_URL}/api/auth/github/callback`,
  },
};

// Fail fast on settings the API cannot run without, and explain the optional ones.
export const validateEnv = () => {
  const missing = ['MONGO_URI', 'JWT_SECRET'].filter((key) => !isRealValue(process.env[key]));
  if (missing.length) {
    console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
    process.exit(1);
  }

  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction && /localhost/.test(CLIENT_URL)) {
    console.warn('CLIENT_URL points to localhost in production — set it to your deployed frontend URL.');
  }
  if (isProduction && /localhost/.test(BACKEND_URL)) {
    console.warn('BACKEND_URL points to localhost in production — OAuth callbacks will fail. Set it to your deployed API URL.');
  }

  for (const [provider, cfg] of Object.entries(oauthConfig)) {
    console.log(cfg.enabled
      ? `OAuth ${provider}: enabled (callback ${cfg.callbackURL})`
      : `OAuth ${provider}: disabled (set ${provider.toUpperCase()}_CLIENT_ID and ${provider.toUpperCase()}_CLIENT_SECRET to enable)`);
  }
  console.log(`CORS allowed origins: ${CORS_ORIGINS.join(', ')}`);
};
