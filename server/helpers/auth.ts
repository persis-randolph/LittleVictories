import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import dotenv from 'dotenv';

const { Strategy } = FacebookStrategy;

dotenv.config();

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID_FB ! as string,
    clientSecret: process.env.CLIENT_SECRET_FB ! as string,
    callbackURL: "https://auth.expo.io/@persis.randolph/littlevictories"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));