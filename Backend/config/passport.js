import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../user.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --- ES Module Fix for __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Explicitly load .env from the parent directory ---
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || `http://localhost:${process.env.PORT || 5000}/api/auth/google/callback`;
const githubCallbackUrl = process.env.GITHUB_CALLBACK_URL || `http://localhost:${process.env.PORT || 5000}/api/auth/github/callback`;

// Strategy for Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: googleCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ 
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] 
        });

        if (!user) {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName
            });
        }
        return done(null, user);
    } catch (err) { return done(err, null); }
}));

// Strategy for GitHub
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        let user = await User.findOne({ $or: [{ githubId: profile.id }, { email }] });

        if (!user) {
            user = await User.create({
                githubId: profile.id,
                email: email,
                displayName: profile.displayName || profile.username
            });
        }
        return done(null, user);
    } catch (err) { return done(err, null); }
}));

export default passport;