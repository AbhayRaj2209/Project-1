import express from 'express';
import passport from '../config/passport.js';
import { oauthConfig } from '../config/env.js';
import { signup, login, googleCallback, githubCallback, oauthFailure, requestPasswordReset, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Lets the frontend know which social logins are available
router.get('/providers', (req, res) => {
  res.json({
    google: oauthConfig.google.enabled,
    github: oauthConfig.github.enabled,
  });
});

const label = { google: 'Google', github: 'GitHub' };

const requireProvider = (provider) => (req, res, next) => {
  if (!oauthConfig[provider].enabled) {
    return oauthFailure(res, `${label[provider]} sign-in is not configured on the server.`);
  }
  next();
};

// Handles the provider callback ourselves so failures (denied consent, bad client
// secret, mismatched callback URL...) send the user back to the login page with a
// readable message instead of a raw JSON error.
const handleCallback = (provider, onSuccess) => (req, res, next) => {
  passport.authenticate(provider, { session: false }, (err, user, info) => {
    if (err) {
      console.error(`${label[provider]} OAuth error:`, err.message);
      return oauthFailure(res, `${label[provider]} sign-in failed. Please try again.`);
    }
    if (!user) {
      return oauthFailure(res, info?.message || `${label[provider]} sign-in was cancelled.`);
    }
    req.user = user;
    return onSuccess(req, res, next);
  })(req, res, next);
};

router.get('/google', requireProvider('google'),
  passport.authenticate('google', { scope: ['profile', 'email'], session: false, prompt: 'select_account' }));
router.get('/google/callback', requireProvider('google'), handleCallback('google', googleCallback));

router.get('/github', requireProvider('github'),
  passport.authenticate('github', { scope: ['user:email'], session: false }));
router.get('/github/callback', requireProvider('github'), handleCallback('github', githubCallback));

export default router;
