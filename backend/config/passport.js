import passport          from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy }           from 'passport-google-oauth20';
import User from '../models/User.js';
import { sendTemplateEmail } from '../config/email.js';

export default function configurePassport() {
  /* ── JWT Strategy ──────────────────────────────────────── */
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:    process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.id).select('-password');
          if (!user) return done(null, false);
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  /* ── Google OAuth Strategy ─────────────────────────────── */
  passport.use(
    new GoogleStrategy(
      {
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${(process.env.SERVER_URL || 'http://localhost:5000').replace(/\/$/, '')}/api/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email  = profile.emails?.[0]?.value?.toLowerCase();
          const avatar = profile.photos?.[0]?.value || '';

          // Find or create user
          let user = await User.findOne({ email });

          if (user) {
            // Link Google if not already linked
            if (!user.googleId) {
              user.googleId = profile.id;
              user.avatar = user.avatar || avatar;
              user.isVerified = true;
              await user.save();
            }
          } else {
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
              avatar,
              isVerified: true,
            });

            await sendTemplateEmail(
              user.email,
              "Welcome to PixelTales!",
              "Your account is ready. Start exploring PixelTales and enjoy your favourite cartoons.",
              "account-created",
            );
          }

          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
}
