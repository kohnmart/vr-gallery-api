import passport from "passport";
import Strategy from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      passReqToCallback: true,
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      })
      
);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

export default passport;
