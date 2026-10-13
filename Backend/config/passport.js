import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../user.js';
import { oauthConfig } from './env.js';

// Find the user by provider id, else by email (linking the provider to an
// existing password account), else create a new one.
const findOrCreateUser = async ({ providerField, providerId, email, displayName }) => {
    const normalizedEmail = email.toLowerCase();
    let user = await User.findOne({ $or: [{ [providerField]: providerId }, { email: normalizedEmail }] });

    if (!user) {
        return User.create({ [providerField]: providerId, email: normalizedEmail, displayName });
    }

    if (!user[providerField]) user[providerField] = providerId;
    if (!user.displayName && displayName) user.displayName = displayName;
    user.lastLoginAt = new Date();
    await user.save();
    return user;
};

// Strategies are only registered when credentials are configured. Constructing a
// strategy without a clientID throws, which previously crashed the whole server
// (taking signup/login down with it) whenever these variables were missing.
if (oauthConfig.google.enabled) {
    passport.use(new GoogleStrategy({
        clientID: oauthConfig.google.clientID,
        clientSecret: oauthConfig.google.clientSecret,
        callbackURL: oauthConfig.google.callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(null, false, { message: 'Your Google account did not share an email address.' });
            const user = await findOrCreateUser({
                providerField: 'googleId',
                providerId: profile.id,
                email,
                displayName: profile.displayName,
            });
            return done(null, user);
        } catch (err) { return done(err, null); }
    }));
}

if (oauthConfig.github.enabled) {
    passport.use(new GitHubStrategy({
        clientID: oauthConfig.github.clientID,
        clientSecret: oauthConfig.github.clientSecret,
        callbackURL: oauthConfig.github.callbackURL,
        // Needed on the strategy itself so passport-github2 fetches private emails
        scope: ['user:email'],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const emails = profile.emails || [];
            const email = (emails.find((e) => e.primary) || emails[0])?.value
                || `${profile.username}@users.noreply.github.com`;
            const user = await findOrCreateUser({
                providerField: 'githubId',
                providerId: profile.id,
                email,
                displayName: profile.displayName || profile.username,
            });
            return done(null, user);
        } catch (err) { return done(err, null); }
    }));
}

export default passport;
