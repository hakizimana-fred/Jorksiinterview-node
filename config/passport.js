import passportJWT from 'passport-jwt';
import User from '../models/User.js'

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET" 
};

export default (passport) => {

passport.use(new JWTStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error('Failed to authenticate with JWT:', error);
    return done(error, false);
  }
}));
}
