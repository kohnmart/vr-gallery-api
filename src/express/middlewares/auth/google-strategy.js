import actionDatabase from "../../../postgres-db/helper/request.js";
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
    (request, accessToken, refreshToken, profile, done) => {
      //Call Database
       actionDatabase({
        method: "select",
        select: ["u_id, u_name"],
        table: "user",
        idName: "u_cred_id",
        idValue: profile.id,
      })
        .then((res) => {
          // CHECK IF USER FOUND => RETURN
          if (res.result) {
            console.log("user found");
            return done(null, res);
          }
          // USER NOT FOUND => REGISTER
          else {
            const registerResult = actionDatabase({
              method: "insert",
              table: "user",
              columns: ["u_cred_id", "u_name"],
              set: [profile.id, profile.displayName],
              returningId: "u_id",
            });
            return done(null, registerResult);
          }
        })
        .catch((err) => {
          console.log(err);
          return done(null, false);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
